# Cypress E2E - Juice Store

This project was developed to demonostrate how implement the automation tests with cypress against the site juice store application.
In addition to running  the tests in a CI/CD pipeline with GitActions

The Juice Shop application was chosen to create the automation tests. This is a simple project with easy configuration and few dependencies.
this appproach helps to avoid complexity and reduce memory consumption
during execution in the Github Actions pipeline, which has memory limitations. In addition this application is free to use.

This project presents the main features of the cypress and Github Actions. It demonstrates how these tools can make it easier to implement automated tests and CI/CD in everyday development.

## Git actions workflow:

You can find the e2e.yml file in .github/workflows. I will explain in each functionality below.

Install all dependencies configured in the package.json file
```yaml
      - name: Install dependencies
        run: npm install
```

This part, Juice shopp application must be installed using a docker container and launch a URL
```yaml
      - name: Install Juice Shop
        run: docker pull bkimminich/juice-shop:v20.0.0

      - name: Start Juice Shop
        run: docker run -d -p 3000:3000 bkimminich/juice-shop:v20.0.0

      - name: Wait for Juice Shop
        run: npx wait-on http://localhost:3000
```

Allure Cli must be installed using npm tool to manage the report files.
```yaml
      - name: Instalar Allure CLI
        run: |
          sudo apt-get update
          sudo apt-get install -y default-jre
          npm install -g allure-commandline --save-dev
```

Provide the report files from the gh-pages branch to download int he the current branch
```yaml
      - name: Checkout gh-pages
        uses: actions/checkout@v4
        if: always()
        continue-on-error: true
        with:
          ref: gh-pages
          path: gh-pages

      - name: Download the allure history from gh-pages
        if: always()
        run: |
          mkdir -p allure-results/history

          if [ -d "gh-pages/history" ]; then
            cp -r gh-pages/history/* allure-results/history || true
          fi
```

Copy the history folder to a temporary folder
```yaml
      - name: Copy old history to folder
        if: always()
        run: npm run e2e:history
```

Setup the report information file before starting the tests
```yaml
      - name: allure configuration executor
        if: always()
        run: npm run e2e:configuration
```

Starting the tests
```yaml
      - name: Run Cypress tests
        if: always()
        run: npm run cy:run
```

The tests were completed and the report result were updated
```yaml
      - name: Update the allure report
        if: always()
        run: npm run e2e:results
```        

Send the reports files to the Github Pages and Github pages workflow will start updating automatically
```yaml
      - name: Deploy the report in the Github Pages
        uses: peaceiris/actions-gh-pages@v4
        if: always()
        with:
          github_token: ${{secrets.GITHUB_TOKEN}}
          publish_branch: gh-pages
          publish_dir: allure-report
```  

## How run the tests locally

you can execute the commands using npm tool and I configured all scripts in the package.json file to make the command line easier to use.

This command will execute the tests and update the report file
```shell
npm run test:execution
```

This command will execute the same commands above but it will also open the allure report URL
```shell
npm run test:report
```
