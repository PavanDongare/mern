CREATE TABLE Profiles(
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
FOREIGN KEY ('profile_id') REFERENCES Profiles('profile_id')
);


CREATE TABLE Social(
'social_id' int(20) NOT NULL AUTO_INCREMENT,
'profile_id' int(20) NOT NULL

'linkedin' VARCHAR(255),
'facebook'  VARCHAR(255),
'othersite' VARCHAR(255) ,


PRIMARY KEY ('social_id'),
FOREIGN KEY ('profile_id') REFERENCES Profiles('profile_id')
);


CREATE TABLE Posts(
'post_id' int(20) NOT NULL AUTO_INCREMENT,
'profile_id' int(20) NOT NULL

'caption'  VARCHAR(255) NOT NULL,
'text' TEXT NOT NULL,

PRIMARY KEY ('post_id'),
FOREIGN KEY ('profile_id') REFERENCES Profiles('profile_id')
);

CREATE TABLE Comments(
'comment_id' INT(20) NOT NULL AUTO_INCREMENT,

'post_id' INT(20) NOT NULL,
'profile_id' INT(20) NOT NULL,

'content' TEXT NOT NULL,
'date_created' DATE NOT NULL,

PRIMARY KEY ('comment_id'),

FOREIGN KEY ('post_id') REFERENCES Posts('post_id')
FOREIGN KEY ('profile_id') REFERENCES Profiles('profile_id')

);


CREATE TABLE Likes(
'profile_id' INT(20) NOT NULL AUTO_INCREMENT,
'post_id' int(20) NOT NULL,
'date_created' DATE NOT NULL,

PRIMARY KEY ('profile_id', 'post_id'), /* only one like for a post from profile, but comments can be many */
UNIQUE INDEX ('post_id', 'profile_id'), 


FOREIGN KEY ('post_id') REFERENCES Posts('post_id'),
FOREIGN KEY ('profile_id') REFERENCES Profiles('profile_id')
);