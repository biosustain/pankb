import re

def _parse_get_array(req_get, name):
    data = {}
    for k, v in req_get.items():
        if not k.startswith(f"{name}["):
            continue
        i, s = k[(len(name) + 1) :].split("]", 1)
        i = int(i)
        if s[0] != "[":
            continue
        s = s[1:]
        prop, s = s.split("]", 1)
        if s:
            if s[0] != "[":
                continue
            subprop, s = s[1:].split("]", 1)
            prop = f"{prop}.{subprop}"
        if not i in data:
            data[i] = {}
        data[i][prop] = v
    data = [data[i] for i in range(len(data))]
    return data

def create_datatables_api(
    mongo_aggregate, request_get, select_pipeline, out_keys, as_list=True
):
    draw = int(request_get["draw"])
    start = int(request_get["start"])
    length = int(request_get["length"])

    columns = _parse_get_array(request_get, "columns")
    order = _parse_get_array(request_get, "order")
    search = {
        "value": request_get.get("search[value]", ""),
        "regex": request_get.get("search[regex]", "false"),
    }

    projection = {f"results.{gk}": 1 for gk in out_keys}
    projection["info.filtered"] = 1

    filter_pipeline = []
    results_pipeline = []

    if start > 0:
        results_pipeline.append({"$skip": start})
    if length != -1:
        results_pipeline.append({"$limit": length})

    col_search = {}
    for column in columns:
        # if column.get("searchable", "false") != "true":
        #   continue
        if column.get("search.value", "") == "":
            continue
        q = re.sub(r"[^A-Za-z0-9-_\s]+", "", column["search.value"])
        q = q.strip()
        q = " ".join(q.split())
        col_search[column["name"]] = {"$regex": q, "$options": "i"}

    glob_search = []
    if search.get("value", "") != "":
        q = re.sub(r"[^A-Za-z0-9-_\s]+", "", search["value"])
        q = q.strip()
        q = " ".join(q.split())
        for column in columns:
            if column.get("searchable", "false") != "true":
                continue
            glob_search.append({column["name"]: {"$regex": q, "$options": "i"}})

    if col_search and not glob_search:
        filter_pipeline.append(
            {
                "$match": col_search,
            }
        )
    elif glob_search and not col_search:
        filter_pipeline.append(
            {
                "$match": {"$or": glob_search},
            }
        )
    elif col_search and glob_search:
        filter_pipeline.append(
            {
                "$match": {"$and": [col_search, {"$or": glob_search}]},
            }
        )

    if len(order) > 0:
        filter_pipeline.append(
            {"$sort": {x["name"]: (-1 if x["dir"] == "desc" else 1) for x in order}}
        )

    total_count_pipeline = select_pipeline + [
        {"$group": {"_id": None, "count": {"$sum": 1}}}
    ]

    pipeline = (
        select_pipeline
        + filter_pipeline
        + [
            {
                "$facet": {
                    "info": [{"$count": "filtered"}],
                    "results": results_pipeline,
                }
            },
            {"$unwind": "$info"},
            {"$project": projection},
        ]
    )

    results_count = list(mongo_aggregate(total_count_pipeline))
    results = list(mongo_aggregate(pipeline))

    if not results and not results_count:
        data = []
        recordsTotal = 0  # TODO: this is not really correct
        recordsFiltered = 0
    elif not results:
        data = []
        recordsTotal = int(results_count[0]["count"])
        recordsFiltered = 0
    else:
        data = list(results[0]["results"])
        recordsTotal = int(results_count[0]["count"])
        recordsFiltered = results[0]["info"]["filtered"]
        if as_list:
            data = [[g.get(gk, None) for gk in out_keys] for g in data]

    draw = draw + 1

    response = {
        "draw": draw,
        "recordsTotal": recordsTotal,
        "recordsFiltered": recordsFiltered,
        "data": data,
        "columns": columns,
        "order": order,
    }
    return response


def create_datatables_api_mongodb(
    mongo_aggregate, request_get, select_pipeline, out_keys, as_list=True
):  # Does not work on Azure Cosmos MongoDB (vCore) 7.0
    draw = int(request_get["draw"])
    start = int(request_get["start"])
    length = int(request_get["length"])

    columns = _parse_get_array(request_get, "columns")
    order = _parse_get_array(request_get, "order")
    search = {
        "value": request_get.get("search[value]", ""),
        "regex": request_get.get("search[regex]", "false"),
    }

    projection = {f"results.{gk}": 1 for gk in out_keys}
    projection["info.total"] = 1
    projection["info.filtered"] = 1

    filter_pipeline = []
    results_pipeline = []

    if start > 0:
        results_pipeline.append({"$skip": start})
    if length != -1:
        results_pipeline.append({"$limit": length})

    col_search = {}
    for column in columns:
        # if column.get("searchable", "false") != "true":
        #   continue
        if column.get("search.value", "") == "":
            continue
        q = re.sub(r"[^A-Za-z0-9-_\s]+", "", column["search.value"])
        q = q.strip()
        q = " ".join(q.split())
        col_search[column["name"]] = {"$regex": q, "$options": "i"}

    glob_search = []
    if search.get("value", "") != "":
        q = re.sub(r"[^A-Za-z0-9-_\s]+", "", search["value"])
        q = q.strip()
        q = " ".join(q.split())
        for column in columns:
            if column.get("searchable", "false") != "true":
                continue
            glob_search.append({column["name"]: {"$regex": q, "$options": "i"}})

    if col_search and not glob_search:
        filter_pipeline.append(
            {
                "$match": col_search,
            }
        )
    elif glob_search and not col_search:
        filter_pipeline.append(
            {
                "$match": {"$or": glob_search},
            }
        )
    elif col_search and glob_search:
        filter_pipeline.append(
            {
                "$match": {"$and": [col_search, {"$or": glob_search}]},
            }
        )

    if len(order) > 0:
        filter_pipeline.append(
            {"$sort": {x["name"]: (-1 if x["dir"] == "desc" else 1) for x in order}}
        )

    pipeline = select_pipeline + [
        {
            "$facet": {
                "total_info": [{"$count": "total"}],
                "filter": filter_pipeline,
            }
        },
        {"$unwind": "$total_info"},
        {"$unwind": "$filter"},
        {"$addFields": {"filter.total": "$total_info.total"}},
        {"$replaceRoot": {"newRoot": "$filter"}},
        {
            "$facet": {
                "info": [{"$count": "filtered"}],
                "results": results_pipeline,
            }
        },
        {"$unwind": "$info"},
        {"$addFields": {"first_doc": {"$first": "$results"}}},
        {"$addFields": {"info.total": "$first_doc.total"}},
        {"$project": projection},
    ]

    results = list(mongo_aggregate(pipeline))

    if not results:
        data = []
        recordsTotal = 0  # TODO: this is not really correct
        recordsFiltered = 0
    else:
        data = list(results[0]["results"])
        recordsTotal = results[0]["info"]["total"]
        recordsFiltered = results[0]["info"]["filtered"]
        if as_list:
            data = [[g.get(gk, None) for gk in out_keys] for g in data]

    draw = draw + 1

    response = {
        "draw": draw,
        "recordsTotal": recordsTotal,
        "recordsFiltered": recordsFiltered,
        "data": data,
        "columns": columns,
        "order": order,
    }
    return response