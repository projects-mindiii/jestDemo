# node-yarn-project-structure Node version 16.13.1
<!-- Crave Api   -->

Objective:-  Our goal is to achieve the new module-wise programming in our project so it manages the coding standard and clarifies the working style.

Introduction:- We are going to make a new project structure that is useful for module-wise project development. We tried to make separated all the modules but some files that are common for all modules. If you are writing code or making any folder and file outside according to you so please connect with Sr. otherwise you can not make it. 

Structure:-
Level One Color - Blue
Level Two-Color - Pink
Level Three Color - Red
Level Four Color -  #cc4125

Root Folder


 1. /public :- Contains all static content (images, style-sheets, client-side JavaScript)
	
           A . assets/
images:- Contains image files that we are using for the development
css :- Contains style sheets (or compiled output by a css engine)
js:- Contains client-side JavaScript and also we can make our custom js but module wise don’t try to put all module js in a single file
fonts:- contains all web fonts



 2. /src:- contains all your server-side files
	
	    A. /config:- Contains all the configuration(basic settings like email setting, DB  connection info) of the project (we already do in the project structure)
	    B. /constants:- Contains all constants of the project
	    C. /cron        :- Contains all cron-job that are directly executed
	    D. /emails     :- Contains all email templates Like signup,forgot etc 
	    E. /libs          :- Is usually used for custom class/functions/modules
	    F. /vendor     :- Contains 3rd party libraries
	    G./locales     :- Contains all the localization files for language 
	    H. /migrations:- Contains all the tables
	    I. /seeds       :- Contains all the seeds(If we want to insert some meta like category, userType etc then we will write one script and this script execute when trigger) 
            J ./models    :- Contains all common operations like insert/update/delete(For DB) that are used in the project.
	    K /middlewares:- We can manage all the middleware here for the whole project

3. /modules:-Its contains all the modules of the project and it’s a very important part of the project before doing anything consult with your Sr. So they will advise you accordingly requirements.  
       
        1.  /v1:-  Maintain a version of the project
           
            A ./Auth: contains auth modules 
             
/controllers:- contains the module related controllers
/models:- contains the module related models
/views:- contains the module related views Multiple View implementations 
/routes:- contains the module related routes
/validators:- contains the module related validators
             f.  /services:- contains relation b/w model and controllers

       
            B. /User : contains user modules 

/controllers:- contains the module-related controllers
/models:- contains the module related models
/views:- contains the module related views
/routes:- contains the module related routes
     e.  /validators:- contains the module related validators
 /services:- contains relation b/w model and controllers


                            .
      2. /routes:- Contains all the routes of the project (linking all the routes that will be used external routes)


4. utils:- That contains the project's settings like Datetime, logger, localization, response files, validate files, errors. Basically in this folder, we will put all our files which has a setting

Framework base files that are mandatory files on root structure Like 

5. env
6. babelrc
7. package.json
8. yarn.lock

#YARN

Node version 16.13.1
cmd for yarn

1. corepack enable
2. yarn
3. yarn --version
4. yarn help
5. yarn init
6. yarn init -y (Y for not asking anything to you)
7. yarn config set init-licence ISC (If we set the licence)
8. yarn config get init-license (If we get the licence)
9. yarn config delete init-licence(If we want to delete)
10. yarn add lodash (we was used npm install lodash)
11. yarn add moment

if we directly want to add package and modify into package.json file then we have to run the below cmd

12. yarn install
13. yarn remove lodash (remove any package)
14. yarn add lodash@4.17.3 (any particular version installation)
15. yarn outdated  (If you want outdated packages in project)
16. yarn upgrade lodash (Update the version is its deprecated)
17. yarn upgrade (update all the latest packages)
18. yarn global add nodemon (install package globally)
19. yarn global bin (where is the global package install) 
20. yarn global remove nodemon (remove package globally)
21. yarn list --depth=0  (remove packages dependency inside the package)
22. yarn list --pattern gulp (check all the dependency for particular package)
23. yarn add gulp -D (developer dependency)
24. yarn import (to generate the yarn.lock file)
25. yarn run dev
26. yarn cache list --pattern loadash

27. yarn add  @babel/core @babel/cli @babel/node @babel/preset-env
28. yarn add babel-plugin-root-import
29. yarn add dotenv
30. yarn add knex
31. yarn knex init
32. yarn add express
33. yarn add pg
34. yarn add mysql
35. yarn add body-parser
36. yarn add migrate (add migrate packege)
<!-- file upload packege -->
37. yarn add aws-sdk
38. yarn add @aws-sdk/client-s3
39. yarn multer multer-s
40. yarn add multer
41. yarn add jimp
42. yarn add concat-stream
43. yarn add streamifier
44. yarn add mkdirp
<!-- authentication and hashing package -->
45. yarn add jsonwebtoken
46. yarn add bcryptjs
47. yarn add hashids-bn
48. yarn add bcrypt 

<!-- localization package -->
49. yarn add i18next
50. yarn add i18next-express-middleware
51. yarn add i18next-node-fs-backend
52. yarn add i18n
<!-- email package -->
53. yarn add nodemailer
54. yarn add nodemailer-express-handlebars
