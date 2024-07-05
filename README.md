# Next14 template with Supabase, Stripe and Drizzle

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                                                                                 |
| :---------------------- | :----------------------------------------------------------------------------------------------------- |
| `npm install`           | Installs dependencies                                                                                  |
| `npm run dev`           | Starts local dev server at `localhost:3000`                                                            |
| `npm run build`         | Build the project                                                                                      |
| `npm run stripe:listen` | Start listening for Stripe events and forward them to `http://localhost:3000/api/payment/stripe-hooks` |
| `npm run type-check`    | Run TypeScript type checking using `tsc --noEmit`                                                      |
| `npm run lint`          | Run Lint                                                                                               |
| `npm run lint --fix`    | Run Lint and autofix issues`                                                                           |
| `npm run db:generate`   | Generate database migrations                                                                           |
| `npm run db:migrate`    | Run database migrations                                                                                |
| `npm run db:seed`       | Seed database                                                                                          |
| `npm run db:reset`      | Reset database                                                                                         |

## Directory Structure

The project is organized around the "feature-first" approach, where each feature of the application resides in its own directory within the `features` folder. This structure promotes modularity and scalability, making it easier to manage and develop the application as it grows.

Within each feature directory, you will find the following subdirectories and files:

-   `services/`: Contains the business logic and data fetching mechanisms. Services are responsible for communicating with external APIs or databases.
-   `components/`: Holds the React components specific to this feature.
-   `api/`: Contains api calls (for ex: react-query calls)
-   Other files: Depending on the feature's needs, you might find additional files and directories here, such as utilities, hooks, or context providers.

## Setup

1. Copy `.env.sample` into `.env`
2. Go to [Supabase](https://supabase.com/) and create a new project.
3. From `Project Settings -> API` get your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
4. From `Project Settings -> Database` get your `Connection string` and set it as `DATABASE_URL`. 
    - It should be something like this: `postgres://postgres.[ID]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`.
5. Visit the [Stripe](https://stripe.com/) website and create an account. After that, login to the `Dashboard`, navigate to the `Developers` section. Click on the `API KEYS` tab and get the `secret key` and store it inside `STRIPE_SECRET_KEY` variable.
6. Install the [Stripe cli](https://stripe.com/docs/stripe-cli). After you login, run `npm run stripe:listen`. You will get a message `Your webhook signing secret is whsec_8be0f03b...`. Store that signing secret as `STRIPE_SIGNING_SECRET`.
7. The last step is to go to `Supabase -> Authentication -> Providers` and configure `Github` and `Google` auth.
Now you're good to go!

Enjoy! 