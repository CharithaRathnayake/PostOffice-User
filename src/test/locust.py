import time
from locust import HttpUser,task,between

class WebSiteUser(HttpUser):
    wait_time=between(1,5)

    @task
    def home_page(self):
        self.client.get(url="/")
        self.client.get(url="/complain")
        self.client.get(url="/deliverytime")
    