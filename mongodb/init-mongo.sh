set -e

mongosh <<EOF
    # First, create the root user: ----
    var admin = db.getSiblingDB('admin');
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    admin.createUser({user: rootUser, pwd: rootPassword, roles: ["userAdminAnyDatabase"]});

    # Second, authenticate as the root user to order to be able to add other users: ----
    admin.auth(rootUser, rootPassword);

    # Third, add the user who will own the PanKB DB
    var db = db.getSiblingDB('$MONGODB_AUTH_SOURCE')
    var user = '$MONGODB_USERNAME';
    var passwd = '$MONGODB_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: ["dbOwner"]});
EOF