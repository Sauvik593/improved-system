# Welcome to new Kyero frontend app

This is a new application for frontend built in _Remix_. It's a BFF(backend for frontend) app, communicating with Rails API.

## Redis Cache keys

<!-- prettier-ignore-start -->
| route | cache key formula | example |
|---|---|---|
| {{locale}}/{{country}} - /en/portugal {{ locale }} - /en  | FRONTEND.{{KYERO_ENV}}.{{locale}}.{{countryId}}.homepage.{{version}} | FRONTEND.development.en.55529.homepage.v.0.8 |
|  |  |  |
<!-- prettier-ignore-end -->
