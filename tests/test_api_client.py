from fastapi.testclient import TestClient
from app.main import app
import uuid

client = TestClient(app)

def test_api():
    # 1. Test Root
    res = client.get("/")
    assert res.status_code == 200
    print("Root Endpoint: OK")
    
    # 2. Test Get Posts without Auth
    res = client.get("/posts/")
    assert res.status_code == 401
    print("Get Posts (Unauthorized): OK")
    
    # 3. Create User
    user_data = {"email": f"testuser_{uuid.uuid4().hex[:6]}@example.com", "password": "password123"}
    res = client.post("/users/", json=user_data)
    assert res.status_code == 201
    print("Create User: OK")
    
    # 4. Login User
    login_data = {"username": user_data["email"], "password": user_data["password"]}
    res = client.post("/login", data=login_data)
    assert res.status_code == 200
    token = res.json().get("access_token")
    assert token is not None
    print("Login User: OK")
    
    # 5. Get Posts with Auth
    headers = {"Authorization": f"Bearer {token}"}
    res = client.get("/posts/", headers=headers)
    assert res.status_code == 200
    print("Get Posts (Authorized): OK")

if __name__ == "__main__":
    test_api()
