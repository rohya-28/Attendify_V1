npx expo start -c it will clear cache.

working
{
  "firstName": "Michael",
  "lastName": "Johnson",
  "email": "michael.johnson@example.net",
  "password": "SecurePass456!",
  "role": "ADMIN",
  "phoneNumber": "1122334455",
  "profilePic": "https://example.net/images/user-profile.png",
  "organizationName": "Tech Innovators Institute",
  "address": "456 Innovation Drive, Tech City, TX 67890",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}

{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice.smith011@example.com",
  "password": "TestPassword123!",
  "role": "STUDENT",
  "phoneNumber": "9876543210",
  "profilePic": "https://example.com/images/default-profile.png",
  "organizationName": "Example University",  // This will be ignored for students
  "address": "123 Testing Lane, Sample City, ST 12345",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "organizationId": "60f1c1f27e5b8a3ad36e44d1" // Organization ID for student (required)
}

