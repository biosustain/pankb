from django.http import HttpResponse, StreamingHttpResponse
import csv

# Source: https://docs.djangoproject.com/en/5.0/howto/outputting-csv/
class Echo:
    """An object that implements just the write method of the file-like
    interface.
    """

    def write(self, value):
        """Write the value by returning it, instead of storing in a buffer."""
        return value

def iter_dict_writer_items(items, field_names):
    pseudo_buffer = Echo()
    writer = csv.DictWriter(pseudo_buffer, fieldnames=field_names)
    yield writer.writeheader()

    for item in items:
        yield writer.writerow(item)
    
def dict_writer_response(file_name, field_names, rows):
    response = StreamingHttpResponse(
        iter_dict_writer_items(rows, field_names), content_type="text/csv"
    )
    response['Content-Disposition'] = f"attachment; filename={file_name}"
    return response

def list_writer_response(file_name, rows):
    pseudo_buffer = Echo()
    writer = csv.writer(pseudo_buffer)

    # User the StreamingHttpResponse instead of HttpResponse to serve potentially large csv files
    # to avoid a load balancer dropping the connection (otherwise we can get the connection timeout): ----
    response = StreamingHttpResponse(
        (writer.writerow(row) for row in rows), content_type="text/csv"
    )
    response['Content-Disposition'] = f"attachment; filename={file_name}"
    return response