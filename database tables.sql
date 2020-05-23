CREATE TABLE profiles(
'profile_id' int(20) NOT NULL AUTO_INCREMENT,
'email' VARCHAR(255) NOT NULL,
'name' VARCHAR(255) NOT NULL,
'company' VARCHAR(255) ,
'website' VARCHAR(255) ,
'location' VARCHAR(255),

PRIMARY KEY ('profile_id'),
UNIQUE KEY 'email' ('email'),
FOREIGN KEY ('email') REFERENCES user('email')
);

CREATE TABLE Experience(
'experience_id' int(20) NOT NULL AUTO_INCREMENT,
'profile_id' int(20) NOT NULL

'location' VARCHAR(255),
'title'  VARCHAR(255),
'company' VARCHAR(255) ,
'date_to' DATE NOT NULL,
'date_from' DATE NOT NULL,

PRIMARY KEY ('experience_id'),
FOREIGN KEY ('profile_id') REFERENCES profiles('profile_id')
);


CREATE TABLE Social(
'social_id' int(20) NOT NULL AUTO_INCREMENT,
'profile_id' int(20) NOT NULL

'linkedin' VARCHAR(255),
'facebook'  VARCHAR(255),
'othersite' VARCHAR(255) ,


PRIMARY KEY ('social_id'),
FOREIGN KEY ('profile_id') REFERENCES profiles('profile_id')
);


CREATE TABLE Posts(
'post_id' int(20) NOT NULL AUTO_INCREMENT,
'profile_id' int(20) NOT NULL
'caption'  VARCHAR(255),
'latitude' FLOAT NOT NULL,
'longitude' FLOAT NOT NULL,
'type' ENUM('image', 'video'),
'post_url' VARCHAR(255) NOT NULL,
'date_created' DATE NOT NULL,
'date_updated' DATE,
PRIMARY KEY ('post_id'),
FOREIGN KEY ('profile_id') REFERENCES profiles('profile_id')
);


CREATE TABLE Followings(
'profile_id' INT NOT NULL, 
'following_id' INT NOT NULL, 
'date_created' DATE NOT NULL,
PRIMARY KEY ('profile_id', 'following_id'),
UNIQUE INDEX ('following_id', 'profile_id')
FOREIGN KEY ('profile_id') REFERENCES profiles('profile_id')
FOREIGN KEY ('following_id') REFERENCES profiles('profile_id')
);

CREATE TABLE Comments(
'comment_id' INT(20) NOT NULL AUTO_INCREMENT,
'post_id' INT(20) NOT NULL,
'profile_id' INT(20) NOT NULL,
'content' TEXT NOT NULL,
'date_created' DATE NOT NULL,
'date_updated' DATE,
PRIMARY KEY ('comment_id'),
FOREIGN KEY ('post_id') REFERENCES Posts('post_id')
FOREIGN KEY ('profile_id') REFERENCES profiles('profile_id')
);

CREATE TABLE Messages(
'message_id' INT(20) NOT NULL AUTO_INCREMENT,
'profile_id_from' INT(20) NOT NULL,
'profile_id_to' INT(20) NOT NULL,
'content' text NOT NULL,
'date_created' date NOT NULL,
PRIMARY KEY ('message_id'),
FOREIGN KEY ('profile_id_from') REFERENCES profiles('profile_id'),
FOREIGN KEY ('profile_id_to') REFERENCES profiles('profile_id')
);

CREATE TABLE Likes(
'profile_id' INT(20) NOT NULL AUTO_INCREMENT,
'post_id' int(20) NOT NULL,
'date_created' DATE NOT NULL,
PRIMARY KEY ('profile_id', 'post_id'),
UNIQUE INDEX ('post_id', 'profile_id'),
FOREIGN KEY ('post_id') REFERENCES Posts('post_id'),
FOREIGN KEY ('profile_id') REFERENCES profile('profile_id')
);