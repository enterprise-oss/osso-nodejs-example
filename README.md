# Osso NodeJS Example

This repository contains a new NodeJS Express application with the bare minimum work to demonstrate how to integrate Osso.

## Osso integration

Osso promises an easy integration to your Rails app. We provide an passportjs provider package [passport-osso](https://github.com/enterprise-oss/passport-osso) to make integration a breeze.


## Running the example

This example can be run locally or in production. Osso provides a [demo Osso instance](https://demo.ossoapp.com) and a Fake IDP ([repo](https://github.com/enterprise-oss/sinatra-ruby-idp) | [application](https://idp-osso.herokuapp.com)) that allow you to run this example and perform the full authentication flow.

The Osso demo instance reseeds it's database every hour, but is seeded with **most of** the data needed to run this example application.

An OAuth Client with a client ID `demo-client-id` and client secret `demo-client-secret` will always be available - use these in your ENV by either copying the `.env.sample` or by deploying to Heroku which will use the values from `app.json`.

You must however ensure that a Redirect URI exists on the demo instance allow list. If you run locally, you should be all set - `http://127.0.0.1:3000/users/auth/osso/callback` is always present for the demo OAuth client. If you run in production, you must set the production URL in your env as `OSSO_REDIRECT_URI` using the same path, i.e. `https://my-osso-example.herokuapp.com/users/auth/osso/callback`. You then must add that same value to the demo instance - choose the Demo Production OAuth client here and add your redirect URI: <https://demo.ossoapp.com/admin/config>

The Osso demo instance also includes a customer for `example.com` with Osso's Fake IDP configured as an Identity Provider. When attempting to sign in to this app, you must use an email address with the domain `example.com`. You'll then need to log in to the Fake IDP with the `example.com` email and any value as the password.

If authentication is successful, a barebones json object for the authenticated user will be rendered by this application.

You can also use this demo app against your own Osso instance. Change the `client_options.site` value in the [Devise initializer](https://github.com/enterprise-oss/osso-rails-example/blob/main/config/initializers/devise.rb#L16) to match the URL of your instance. You'll also then be responsible for setting OAuth client ENV vars specific to the OAuth clients in your instance.

### Locally

You can run the application locally by cloning the repo. Rename `.env.sample` to `.env` and start the server with `rails s`.

Use `[anything]@example.com` as the email address for signing in.

### Heroku

This app can be deployed to Heroku - the deployed app will have the `OSSO_CLIENT_ID` and `OSSO_CLIENT_SECRET` ENV vars set for the Osso demo instance.

You will need to set one ENV variable, `OSSO_REDIRECT_URI`. It should be `https://YOUR_APP_NAME.herokuapp.com/users/auth/osso/callback`. You then must add that same value to the demo instance - choose the Demo Production OAuth client here and add your redirect URI: <https://demo.ossoapp.com/admin/config>. The demo instance reseeds its database every hour, so this is only intended for demo purposes. Trying to use the demo instance as a production system will not work.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/enterprise-oss/osso-nodejs-example/tree/main)

### Elsewhere

Totally possible, but you're on your own! Just make sure you set the three ENV variables and you should be good to go.
