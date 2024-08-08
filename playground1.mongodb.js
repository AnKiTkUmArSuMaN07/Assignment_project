// 1. Register Users
db.users.insertMany([
    {
      _id: ObjectId("64cfac49f5e9ae437c7f26a1"), // John Doe's ObjectId
      username: "john_doe",
      email: "john.doe@example.com",
      password_hash: "hashed_password", // Always hash passwords in production
      name: "John Doe",
      profile_picture: "url_to_profile_picture",
      bio: "This is my bio.",
      friends: [],
      friend_requests_sent: [],
      friend_requests_received: [],
      created_at: new Date()
    },
    {
      _id: ObjectId("64cfac49f5e9ae437c7f26a2"), // Jane Doe's ObjectId
      username: "jane_doe",
      email: "jane.doe@example.com",
      password_hash: "hashed_password",
      name: "Jane Doe",
      profile_picture: "url_to_profile_picture",
      bio: "Hello, I'm Jane.",
      friends: [],
      friend_requests_sent: [],
      friend_requests_received: [],
      created_at: new Date()
    }
  ]);
  
  // 2. Send a Friend Request from John to Jane
  db.users.updateOne(
    { _id: ObjectId("64cfac49f5e9ae437c7f26a1") }, // John's ObjectId
    { $addToSet: { friend_requests_sent: ObjectId("64cfac49f5e9ae437c7f26a2") } } // Jane's ObjectId
  );
  
  db.users.updateOne(
    { _id: ObjectId("64cfac49f5e9ae437c7f26a2") }, // Jane's ObjectId
    { $addToSet: { friend_requests_received: ObjectId("64cfac49f5e9ae437c7f26a1") } } // John's ObjectId
  );
  
  // 3. Accept the Friend Request (Jane accepts John's request)
  db.users.updateOne(
    { _id: ObjectId("64cfac49f5e9ae437c7f26a2") }, // Jane's ObjectId
    {
      $pull: { friend_requests_received: ObjectId("64cfac49f5e9ae437c7f26a1") }, // Remove John's ID from requests received
      $addToSet: { friends: ObjectId("64cfac49f5e9ae437c7f26a1") } // Add John's ID to Jane's friends list
    }
  );
  
  db.users.updateOne(
    { _id: ObjectId("64cfac49f5e9ae437c7f26a1") }, // John's ObjectId
    {
      $pull: { friend_requests_sent: ObjectId("64cfac49f5e9ae437c7f26a2") }, // Remove Jane's ID from requests sent
      $addToSet: { friends: ObjectId("64cfac49f5e9ae437c7f26a2") } // Add Jane's ID to John's friends list
    }
  );
  
  // 4. Reject a Friend Request (If necessary)
  // Receiver rejects the friend request
  db.users.updateOne(
    { _id: ObjectId("64cfac49f5e9ae437c7f26a2") }, // Jane's ObjectId
    { $pull: { friend_requests_received: ObjectId("64cfac49f5e9ae437c7f26a1") } } // Remove John's ID from Jane's requests received
  );
  
  // Sender's request is removed from their sent requests
  db.users.updateOne(
    { _id: ObjectId("64cfac49f5e9ae437c7f26a1") }, // John's ObjectId
    { $pull: { friend_requests_sent: ObjectId("64cfac49f5e9ae437c7f26a2") } } // Remove Jane's ID from John's requests sent
  );
  
  // 5. Create a Post
  db.posts.insertOne({
    _id: ObjectId("64cfac49f5e9ae437c7f26b1"), // Post's ObjectId
    author_id: ObjectId("64cfac49f5e9ae437c7f26a1"), // John's ObjectId
    content: "This is my first post!",
    created_at: new Date(),
    likes: [],
    comments: []
  });
  
  // 6. Add a Comment to a Post
  db.posts.updateOne(
    { _id: ObjectId("64cfac49f5e9ae437c7f26b1") }, // Post's ObjectId
    {
      $push: {
        comments: {
          _id: ObjectId("64cfac49f5e9ae437c7f26c1"), // Comment's ObjectId
          commenter_id: ObjectId("64cfac49f5e9ae437c7f26a2"), // Jane's ObjectId
          content: "This is a comment.",
          created_at: new Date()
        }
      }
    }
  );
  