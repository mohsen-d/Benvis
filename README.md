# BENVIS

`BENVIS` is a simple bloging app built using _Expressjs_, _Mongodb_, _Bootstrap_ and _handlebars_

## USAGE

**1. Clone the project**

`git clone https://github.com/mohsen-d/Benvis.git`

**2. Set environment variables.**

On your local machine, you can use the `.env` file in the root of the project.

**3. Install dependencies**

`npm i`

**4. Start the project**

`npm run start-local`

**5. Go to address `http://localhost:3000`**

**6. Go to `http://localhost:3000/auth/login` to login and enter the admin panel.**

Username is _`admin`_ without a _`password`_

## STACK

`BENVIS` uses:

- [Quilljs](https://quilljs.com/) for `editor`
- [Winston](https://www.npmjs.com/package/winston) for `logging`
- [Helmetjs](https://helmetjs.github.io/) for `secure HTTP headers`

## DATABASE

`BENVIS` can use `json` and `mongodb` (default) to persist the data. To change the default option, set the `BENVIS_DB` environment variable.
