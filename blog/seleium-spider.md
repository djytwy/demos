### Python with flask and seleium demo


```
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from flask import Flask, request, jsonify
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager # You can use this package in centos server, in this way you don't need manual install Chrome driver.

app = Flask(__name__)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--no-sandbox')  #
chrome_options.add_argument('--disable-dev-shm-usage')  #
chrome_options.add_argument("--window-size=1920,1080") # be careful if you use 'headless' mode you must use this to confirm the elements is rendered
chrome_options.add_argument("--start-maximized") # be careful if you use 'headless' mode you must use this to confirm the elements is rendered
chrome_options.add_argument('--headless')  #
chrome_options.add_argument('blink-settings=imagesEnabled=false')  #
chrome_options.add_argument('--disable-gpu') #
service = Service(ChromeDriverManager().install()) # centos、ubuntu server need
driver = webdriver.Chrome(chrome_options, service)


@app.route('/loginAWS', methods=['POST'])
def loginAWS():
    try:
        data = request.get_json()
        userName = data["userName"]
        password = data['password']
        url = data['url']
        if url is not None and password is not None and userName is not None:
            flag = fetchZkLoginAWS(url,userName, password)
            if flag == "success":
                return jsonify({"message": "success"}), 200
            else:
                return jsonify({"message": f"{flag}"}), 200
        else:
            return jsonify({"message": "url and user name and password must not be null."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/shutdown', methods=['POST'])
def shutdown():
    driver.quit()
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    return 'Server shutting down...'


def fetchZkLoginAWS(url, userName, password):
    try:
        driver.get(url)
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, '.visible-lg #signInFormUsername')))
        user_name_input = driver.find_element(By.CSS_SELECTOR, value='.visible-lg #signInFormUsername')
        user_name_input.send_keys(userName)
        password_input = driver.find_element(By.CSS_SELECTOR, value='.visible-lg #signInFormPassword')
        password_input.send_keys(password)
        submit_btn = EC.element_to_be_clickable(
            (By.CSS_SELECTOR, '.visible-lg input.btn.btn-primary.submitButton-customizable'))
        WebDriverWait(driver, 20).until(submit_btn).click()
        print(driver.current_url)
        return 'success'
    except Exception as e:
        return f'error: timeout to :{url}'


if __name__ == "__main__":
    try:
        app.run(debug=False, host="0.0.0.0", port=8080)
        # app.run(debug=True)
    finally:
        driver.quit()
```