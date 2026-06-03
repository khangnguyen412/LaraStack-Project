## Laravel - React Project 
- Descripttion: Project CMS for fullstack web.
- Purpose: Create CMS system

## Technology in project:
- Language: HTML, CSS, PHP, JavaScript, TypeScript
- Tailwind
- Docker
- Laravel
- ReactJs
- ReactTs

## How to start and testing project
### Start with docker (don't need install xampp, wamp)
- Install docker desktop
- Create dir ./mysql. If you have to rerun docker compose, make sure ./mysql is clear first
- Use cmd in this path
- Start project with the command below (just the first time): 
```
docker-compose down
docker-compose up -d --build
```
- On Window, start project 2nd time onwards with the command below:
```
.\start-project.bat
```
- On Linux & MacOS:
```
.\start-project.sh
```
- Use terminal laravel in docker:
```
docker exec -it Laravel-React-Web bash
```
- Use terminal react in docker:
```
docker exec -it Laravel-React-Frontend sh
```
- Migrate and seeding:
```
docker exec -it Laravel-React-Web bash
php artisan config:clear
php artisan cache:clear
php artisan migrate
php artisan db:seed
```

- Reset migrate and seeding:
```
docker exec -it Laravel-React-Web bash
php artisan migrate:fresh
php artisan db:seed
```

### Install swagger
- Install swagger:
```
composer require darkaonline/l5-swagger
```
- Publish swagger:
```
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
```
- Regenerate swagger:
```
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan l5-swagger:generate
```
- Access swagger:
```
http://localhost:8000/swagger/documentation
```

## Project structure 
- Laravel structure:
```
backend/
├── README.md
├── artisan
├── composer.json
├── Dockerfile
├── package.json
├── phpunit.xml
├── vite.config.js
├── .editorconfig
├── .env.example
├── app/
│   ├── Console/
│   │   └── Kernel.php
│   ├── Contracts/
│   │   └── PaymentGateway.php
│   ├── Exceptions/
│   │   └── Handler.php
│   ├── Http/
│   │   ├── Kernel.php
│   │   ├── Controllers/
│   │   │   ├── Controller.php
│   │   │   ├── ControllerAuth.php
│   │   │   ├── ControllerPermissions.php
│   │   │   ├── ControllerRoles.php
│   │   │   ├── ControllerUsers.php
│   │   │   ├── PaymentIntegration.md
│   │   │   └── Payments/
│   │   │       ├── PaymentStripe.php
│   │   │       └── PaymentVnPay.php
│   │   ├── Middleware/
│   │   │   ├── Authenticate.php
│   │   │   ├── AuthMiddleware.php
│   │   │   ├── CheckJwtFormCookie.php
│   │   │   ├── CheckPermissionMiddleware.php
│   │   │   ├── EncryptCookies.php
│   │   │   ├── PreventRequestsDuringMaintenance.php
│   │   │   ├── RedirectIfAuthenticated.php
│   │   │   ├── TrimStrings.php
│   │   │   ├── TrustHosts.php
│   │   │   ├── TrustProxies.php
│   │   │   ├── ValidateSignature.php
│   │   │   └── VerifyCsrfToken.php
│   │   ├── Requests/
│   │   │   ├── AuthRequest.php
│   │   │   └── UserRequest.php
│   │   └── Resources/
│   │       ├── ErrorsResource.php
│   │       ├── UsersResource.php
│   │       ├── Auths/
│   │       │   ├── AuthsForgotPassword.php
│   │       │   ├── AuthsLogout.php
│   │       │   └── AuthsResetPassword.php
│   │       ├── Payments/
│   │       │   ├── Stripe.php
│   │       │   ├── VnPayIPN.php
│   │       │   └── VnPayVerify.php
│   │       ├── Permissions/
│   │       │   ├── PermissionsCreate.php
│   │       │   ├── PermissionsDelete.php
│   │       │   ├── PermissionsSearch.php
│   │       │   └── PermissionsUpdate.php
│   │       └── Roles/
│   │           ├── RolesCreate.php
│   │           ├── RolesDelete.php
│   │           ├── RolesSearch.php
│   │           └── RolesUpdate.php
│   ├── Jobs/
│   │   └── SendResetPassJob.php
│   ├── Logging/
│   │   ├── README.MD
│   │   ├── DiscordHandler.php
│   │   └── DiscordLogger.php
│   ├── Mail/
│   │   └── ResetPassMail.php
│   ├── Models/
│   │   ├── ModelsPermissions.php
│   │   ├── ModelsRoles.php
│   │   ├── ModelsUsers.php
│   │   └── UserDefault.php
│   ├── Notifications/
│   │   └── ResetPasswordQueued.php
│   ├── OpenApi/
│   │   ├── README.md
│   │   ├── Bootstrap.php
│   │   ├── Requests/
│   │   │   ├── Auths/
│   │   │   │   ├── AuthsForgotPassword.php
│   │   │   │   ├── AuthsLogin.php
│   │   │   │   └── AuthsResetPassword.php
│   │   │   ├── Permissions/
│   │   │   │   ├── PermissionsCreate.php
│   │   │   │   └── PermissionsUpdate.php
│   │   │   ├── Roles/
│   │   │   │   ├── RolesCreate.php
│   │   │   │   └── RolesUpdate.php
│   │   │   └── Users/
│   │   │       └── UsersCreate.php
│   │   ├── Responses/
│   │   │   ├── Auths/
│   │   │   │   ├── AuthsForgotPassword.php
│   │   │   │   ├── AuthsLogin.php
│   │   │   │   ├── AuthsLogout.php
│   │   │   │   ├── AuthsMe.php
│   │   │   │   └── AuthsResetPassword.php
│   │   │   ├── Exceptions/
│   │   │   │   ├── Exception400.php
│   │   │   │   ├── Exception401.php
│   │   │   │   ├── Exception404.php
│   │   │   │   └── Exception500.php
│   │   │   ├── Payments/
│   │   │   │   └── VnPaysIPN.php
│   │   │   ├── Permissions/
│   │   │   │   ├── PermissionsCreate.php
│   │   │   │   ├── PermissionsDelete.php
│   │   │   │   ├── PermissionsGetById.php
│   │   │   │   ├── PermissionsSearch.php
│   │   │   │   └── PermissionsUpdate.php
│   │   │   ├── Roles/
│   │   │   │   ├── RolesCreate.php
│   │   │   │   ├── RolesDelete.php
│   │   │   │   ├── RolesGetById.php
│   │   │   │   ├── RolesSearch.php
│   │   │   │   └── RolesUpdate.php
│   │   │   └── Users/
│   │   │       ├── UsersCreate.php
│   │   │       ├── UsersGetById.php
│   │   │       └── UsersSearch.php
│   │   └── Schemas/
│   │       ├── ExceptionSchema.php
│   │       ├── PermissionSchema.php
│   │       ├── RoleSchema.php
│   │       └── UserSchema.php
│   ├── Providers/
│   │   ├── AppServiceProvider.php
│   │   ├── AuthServiceProvider.php
│   │   ├── BroadcastServiceProvider.php
│   │   ├── EventServiceProvider.php
│   │   └── RouteServiceProvider.php
│   ├── Repositories/
│   │   ├── BasesRepository.php
│   │   ├── PermissionsRepository.php
│   │   ├── RolesRepository.php
│   │   ├── UsersRepository.php
│   │   └── interface/
│   │       ├── BaseRepositoryInterface.php
│   │       ├── PermissionRepositoryInterface.php
│   │       ├── RoleRepositoryInterface.php
│   │       └── UserRepositoryInterface.php
│   └── Services/
│       ├── AuthService.php
│       ├── PermissionService.php
│       ├── RoleService.php
│       ├── UserService.php
│       ├── interface/
│       │   ├── AuthServiceInterface.php
│       │   ├── PermissionServiceInterface.php
│       │   └── RoleServiceInterface.php
│       └── Payments/
│           └── VNPayGateway.php
├── bootstrap/
│   └── app.php
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── broadcasting.php
│   ├── cache.php
│   ├── cors.php
│   ├── database.php
│   ├── filesystems.php
│   ├── hashing.php
│   ├── jwt.php
│   ├── l5-swagger.php
│   ├── logging.php
│   ├── mail.php
│   ├── payment.php
│   ├── queue.php
│   ├── sanctum.php
│   ├── services.php
│   ├── session.php
│   └── view.php
├── database/
│   ├── factories/
│   │   └── UserFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 2019_12_14_000001_create_personal_access_tokens_table.php
│   │   ├── 2025_10_18_071104_create_permission_table.php
│   │   ├── 2025_10_18_071126_create_roles_table.php
│   │   ├── 2025_10_18_071302_create_roles_has_permissions_table.php
│   │   ├── 2025_10_18_071352_create_users_table.php
│   │   ├── 2025_10_18_071451_create_posts_table.php
│   │   ├── 2025_10_18_071523_create_tags_table.php
│   │   ├── 2025_10_18_071615_create_tag_post_table.php
│   │   ├── 2025_10_18_071642_create_categories_table.php
│   │   ├── 2025_10_18_071742_create_category_post_table.php
│   │   ├── 2025_10_18_071855_create_pages_table.php
│   │   ├── 2025_10_18_071956_create_products_table.php
│   │   ├── 2025_10_18_072024_create_products_taxonomy_table.php
│   │   ├── 2025_10_18_072205_create_products_taxonomy_pivot_table.php
│   │   ├── 2025_10_18_072245_create_meta_data_table.php
│   │   ├── 2025_10_18_072324_create_media_table.php
│   │   ├── 2025_10_18_072346_add_uuid_and_backfill.php
│   │   ├── 2025_10_18_072422_switch_to_uuid_pk_and_fk.php
│   │   ├── 2025_10_18_073543_drop_remembertoken_in_user_table.php
│   │   ├── 2026_02_25_063505_update_user_id.php
│   │   ├── 2026_03_06_024357_update_role_guard_name.php
│   │   ├── 2026_03_06_024551_update_permission_guard_name.php
│   │   ├── 2026_05_12_164642_create_jobs_table.php
│   │   ├── 2026_05_13_063115_create_password_resets_table.php
│   │   ├── 2026_05_23_153153_add_password_changed_at_to_users_table.php
│   │   └── 2026_05_23_160748_drop_password_resets_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── DatabaseSeederPermission.php
│       ├── DatabaseSeederRoleHasPermission.php
│       ├── DatabaseSeederRoles.php
│       └── DatabaseSeederUser.php
├── public/
│   ├── index.php
│   ├── robots.txt
│   └── .htaccess
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── app.js
│   │   └── bootstrap.js
│   └── views/
│       ├── payment.blade.php
│       ├── welcome.blade.php
│       └── emails/
│           └── reset_password.blade.php
├── routes/
│   ├── api.php
│   ├── channels.php
│   ├── console.php
│   ├── web.php
│   └── v1/
│       ├── auth.php
│       ├── payment.php
│       ├── permissions.php
│       ├── roles.php
│       └── users.php
├── storage/
│   └── api-docs/
│       └── api-docs.json
└── tests/
    ├── CreatesApplication.php
    ├── TestCase.php
    ├── Feature/
    │   └── ExampleTest.php
    └── Unit/
        └── ExampleTest.php
```

- React structure:
```
frontend-admin/
├── README.md
├── components.json
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .env.example
├── .npmrc
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── api/
│   │   └── axios.ts
│   ├── assets/
│   │   └── scss/
│   │       ├── button.scss
│   │       ├── loading.scss
│   │       ├── style.scss
│   │       ├── layout/
│   │       │   └── header.scss
│   │       └── page/
│   │           ├── dashboard.scss
│   │           ├── login.scss
│   │           ├── userCreation.scss
│   │           └── userList.scss
│   ├── components/
│   │   ├── Editor.tsx
│   │   ├── Error.tsx
│   │   ├── Loading.tsx
│   │   ├── editor/
│   │   │   ├── align-toolbar-button.tsx
│   │   │   ├── blockquote-node.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── editor-static.tsx
│   │   │   ├── editor.tsx
│   │   │   ├── fixed-toolbar.tsx
│   │   │   ├── heading-node.tsx
│   │   │   ├── hr-node.tsx
│   │   │   ├── mark-toolbar-button.tsx
│   │   │   ├── paragraph-node.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── toolbar.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── plugins/
│   │   │       └── basic-blocks-kit.tsx
│   │   ├── Layout/
│   │   │   ├── AdminLayout.tsx
│   │   │   └── FormLogin.tsx
│   │   ├── Partials/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ListData.tsx
│   │   │   ├── SideBar.tsx
│   │   │   └── TableData.tsx
│   │   └── Users/
│   │       ├── UsersDeleteComfirm.tsx
│   │       └── UsersProfileModal.tsx
│   ├── config/
│   │   ├── config.ts
│   │   └── menuItem.tsx
│   ├── constants/
│   │   ├── permissions.ts
│   │   └── tagProps.tsx
│   ├── hooks/
│   │   ├── dayTime.ts
│   │   ├── useDeviceType.ts
│   │   ├── usePermission.ts
│   │   └── useRole.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── mocks/
│   │   ├── mocks.ts
│   │   └── permission/
│   │       └── permission.mocks.ts
│   ├── pages/
│   │   ├── AppDefault.tsx
│   │   ├── Component.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Pages.tsx
│   │   ├── Auths/
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── Login.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── Payments/
│   │   │   └── PaymentTest.tsx
│   │   ├── Permissions/
│   │   │   ├── Permissions.tsx
│   │   │   ├── PermissionsCreate.tsx
│   │   │   └── PermissionsSearch.tsx
│   │   ├── Roles/
│   │   │   ├── Roles.tsx
│   │   │   └── RolesSearch.tsx
│   │   └── Users/
│   │       ├── UsersCreate.tsx
│   │       └── UsersList.tsx
│   ├── redux/
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── features/
│   │       ├── auth.ts
│   │       ├── payment.ts
│   │       ├── permission.ts
│   │       ├── roles.ts
│   │       └── user.ts
│   ├── routes/
│   │   ├── route.tsx
│   │   └── ProtectedRoute/
│   │       └── protectedRoute.tsx
│   ├── services/
│   │   ├── servicesAuth.ts
│   │   ├── servicesPayment.ts
│   │   ├── servicesPermission.ts
│   │   ├── servicesRole.ts
│   │   └── servicesUsers.ts
│   ├── types/
│   │   ├── common.type.ts
│   │   ├── error.type.ts
│   │   ├── login.type.ts
│   │   └── admin/
│   │       ├── permissions.type.ts
│   │       ├── roles.type.ts
│   │       └── users.type.ts
│   └── utils/
│       └── errorHandler.ts
└── .vite/
    └── deps/
        ├── _metadata.json
        ├── antd_lib_locale_en_US.js
        ├── chunk-5WRI5ZAA.js
        ├── chunk-NO6UH6X3.js
        ├── chunk-X5EBYUPF.js
        ├── package.json
        ├── react-redux.js
        ├── react.js
        └── react_jsx-dev-runtime.js
```

- Next structure
```
frontend-client
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── src/
    └── app/
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
        └── api/
            ├── layout.tsx
            └── page.tsx
```

The source was set up by KhangNguyen — do not copy