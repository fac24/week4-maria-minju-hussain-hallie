# seliBay



### Database Schema

Table: users

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| id      | serial          | not null | PRIMARY KEY    |
| username           |  VARCHAR(255)          |   | FOREIGN KEY     |
| password       | text          | not null |     |


Table: posts

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| id      | serial          | not null | PRIMARY KEY    |
| user_id           | integer         |   | FOREIGN KEY  REFERENCES users(id) ON DELETE CASCADE  |
| item_name       |  VARCHAR(255)           |  |     |
| price        | text          |  |     |
| image_info        | text          |  |     |
| image_inmage        | ??          |  |     |


Table: sessions

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| sid      |  VARCHAR(255)           |  | PRIMARY KEY    |
| data           | json         |  not null |      |
