# seliBay



### Database Schema

Table: users

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| id      | serial          | not null | PRIMARY KEY    |
| username           | text         |   | FOREIGN KEY     |
| password       | text          | not null |     |


Table: posts

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| id      | serial          | not null | PRIMARY KEY    |
| user_id           | integer         |   | FOREIGN KEY  REFERENCES users(id) ON DELETE CASCADE  |
| item       | text          |  |     |
| price        | text          |  |     |
| image_info        | text          |  |     |
| image_inmage        | ??          |  |     |


Table: sessions

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| sid      | text          |  | PRIMARY KEY    |
| data           | json         |  not null |      |
