--User's ID is unique and auto incrementing
-- screen name, email and password cannot be NULL
-- bio is just text.

create table Usr(
 User_id          integer       UNIQUE PRIMARY KEY AUTO_INCREMENT,
 screen_name      varchar       (255) UNIQUE not null,
 email            varchar       (255) UNIQUE not null,
 bio              text,
 password         varchar       (255) not null
  ) ENGINE=INNODB;

--Notes on Comments table
--comment_id is the primary key, holds comment text, holds likes and dislikes as integers

create table Comments(
  comment_id     integer       AUTO_INCREMENT,
  comment_text   text,
  likes          integer             not null,
  dislikes       integer             not null,
  PRIMARY KEY  (comment_id)
  ) ENGINE=INNODB;

--Avatar Table
--image location can be null.
--description is stored as just text.
-- primary key is image location I think?

create table Avatar(
  image_location           varchar(255) ,
  description              text,
  av_id integer AUTO_INCREMENT UNIQUE PRIMARY KEY
) ENGINE=INNODB;

--Battle table :
-- battle ID is the unique auto incrementing primary key of this table.
-- winner_id references the critter_id who has won the battle.

create table Battle
  (
  battle_id           integer      NOT NULL  UNIQUE AUTO_INCREMENT,
  winner_id           integer      ,
  PRIMARY KEY (battle_id),
  Quantity_one integer NOT NULL,
  made_by varchar (255) NOT NULL,
  Quantity_two integer NOT NULL,
  Size_one text NOT NULL,
  Size_two text NOT NULL,
  votes_one int(11) DEFAULT 0,
  votes_two int(11) DEFAULT 0
  ) ENGINE=INNODB;


--Critter table :
-- has unique AUTO_INCREMENTing non-null ID
-- stores size, qunatity, as ints and species as a text
  create table Critter(
    critter_id           int       UNIQUE AUTO_INCREMENT NOT NULL,
    species              text ,
    PRIMARY KEY  (critter_id)
  ) ENGINE=INNODB;

--This might need some changes
create table Admin(
  admin_id int UNIQUE NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES Usr (User_id)
)ENGINE=INNODB;




--Below are the unfinished relationships between the tables

--Notes on favorites
--relationship between user and battle



--Votes for
--Relationship where the User votes on a Battle
create table Votes_for(
  id int(11) UNIQUE AUTO_INCREMENT NOT NULL,
  liked boolean NOT NULL,
  battle int NOT NULL,
  usr INT NOT NULL,
  FOREIGN KEY (battle) REFERENCES Battle (battle_id),
  FOREIGN KEY (usr) REFERENCES Usr (User_id)
)ENGINE=INNODB;

--Creates_a
--Relationship where User creates a battle
create table Creates_a(
  id int(11) UNIQUE AUTO_INCREMENT NOT NULL,
  battle int NOT NULL PRIMARY KEY,
  usr INT NOT NULL,
  FOREIGN KEY (battle) REFERENCES Battle (battle_id),
  FOREIGN KEY (usr) REFERENCES Usr (User_id)
)ENGINE=INNODB;

--Takes_part_in
--Relationship of Critters battling
create table Takes_part_in(
id int(11) UNIQUE AUTO_INCREMENT NOT NULL,
  critter_one int NOT NULL,
  critter_two int NOT NULL,
  battle int NOT NULL,
  FOREIGN KEY (battle) REFERENCES Battle (battle_id),
  FOREIGN KEY (critter_one) REFERENCES Critter (critter_id),
  FOREIGN KEY (critter_two) REFERENCES Critter (critter_id)
)ENGINE=INNODB;

--User_has_a
--Relationship where User has an avatar
create table User_has_a(
  usr INT NOT NULL,
  FOREIGN KEY (usr) REFERENCES Usr (User_id),
  av_id integer NOT NULL,
  FOREIGN KEY (av_id) REFERENCES Avatar (av_id)
)ENGINE=INNODB;

--Critter_has_a
--Relationship where the Critter has an avatar
create table Critter_has_a(
  critter INT NOT NULL,
  FOREIGN KEY (critter) REFERENCES Critter (critter_id),
  av_id int UNIQUE NOT NULL,
  FOREIGN KEY (av_id) REFERENCES Avatar (av_id)
)ENGINE=INNODB;





create table Comment_of(
id int(11) UNIQUE AUTO_INCREMENT NOT NULL,
  comment_id integer UNIQUE,
    battle integer,
      FOREIGN KEY (comment_id) REFERENCES Comments (comment_id),
        FOREIGN KEY (battle) REFERENCES Battle (battle_id)
	)ENGINE=INNODB;


-- Test that the correct foreign keys were created
--SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
