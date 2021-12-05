- [NODEJS](#nodejs)
- [Instructions](#instructions)
    - [Run the project](#run-the-project)
        - [Step 1: Install packages (Optional)](#step-1-install-packages)
        - [Step 2: Configure environment variables](#step-2-configure-environment-variables)
        - [Note](#note)

# NODEJS

Require install: node (>=10.16.0 <=14.x.x), yarn (or npm).

# Instructions

## Run the project

### Step 1: Install packages

To install packages, open the terminal (bash, cmd, ...) and enter the following command:

```bash
$ yarn

# Or using npm
npm install
```

### Step 2: Configure environment variables

1. Create `.env` file at `./packages/web-client`.  

2. Open the `.env.example` file at `./packages/web-client/.env.example` and copy all its code.

3. Paste that code to `.env` file and configure.

4 . `yarn start` or `npm start` to start project.


### Note:

1. Thư mục Containers chứa những trang lớn, nên viết các reducer và các actions trong 1 thư mục page để dể quản lý

2. Thư mục Components trong containers chứa từng component con của 1 page. Nên gộp những component liên quan với nhau vào 1 thư mục chung nằm trong thư mục Components

3. Thư mục Reducers để chứa các reducer của redux

4. Thư mục store để chứa store của redux

5. Thư mục actions để chứa các action của redux, nên tạo các function gọi api ở đây

6. Thư mục Constants để chứa các hằng số

7. Thư mục helper để chứa các hàm helper viết thêm.

8. Axios đã được cấu hình trong file Config/Axios