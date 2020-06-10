--insert data into the User table as if they were creating their account for the first time, bio will be added later if they desire
INSERT INTO Usr (screen_name, email, password, bio) VALUES
("James", "james@google.net", "password123", "Hello"),
("Wilbur", "willy@bur.tv", "123abc", "Howdy"),
("Chap", "man@wo.com", "foobar", "Im a user!"),
("Man", "manny@man.man", "verymanly", "PotatoesAreCritterrsToo"),
("winghenge", "wing@henge.com", "abcdefg", "I beleive i can fly"),
("fred", "fred@scooby.snacks", "jinkies", "Its just a mask!"),
("Mcdonald", "whopper@fast.food", "supersizeme", "super size me"),
("King", "burger@sauce.saucy", "whyevenbother", "jumbo fries"),
("Hamantha", "ham@for.face", "hammybone", "i have a ham for a face"),
("Shaggy", "Need.food@belly.now", "yumyum", "I never lose a battle with my critters!");

--Create critters
INSERT INTO Critter (species) VALUES
("Cow"),
("Horse"),
("Duck"),
("Llama"),
("Dog"),
("Cat"),
("Alpaca"),
("Bug"),
("Tiger"),
("Lion");

--Create an avatar and link it to either a creature or an user
INSERT INTO Avatar (image_location, description ) VALUES
("http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg", "picture: 1"),
("http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg", "picture: 2"),
("http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg", "picture: 3"),
("http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg", "picture: 4"),
("http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg", "picture: 5"),
("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wired.com%2Fwp-content%2Fuploads%2F2015%2F04%2F85120553.jpg&f=1&nofb=1", "picture: 6"),
("https://wallpapercave.com/wp/hbEVhfX.jpg", "picture: 7"),
("http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg", "picture: 8"),
("http://2.bp.blogspot.com/_eIwMvvvkFQk/TTFbMEUfo0I/AAAAAAAAADw/ADqNO-VDiO0/s1600/cute+animals+%25280%2529.jpg", "picture: 9"),
("http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg", "picture: 10"),
("https://www.ucdavis.edu/sites/default/files/styles/panopoly_image_full/public/home-site/blogs/one-health/blog-posts/2018/cow-field-one-health-uc-davis.jpg?itok=lrz5mpyq", "picture: 11"),
("https://www.pbs.org/wgbh/nova/media/original_images/horse-smile_2048x1152.jpg", "picture: 12"),
("http://4.bp.blogspot.com/-28JWho2EmXI/UDd98XboSuI/AAAAAAAAESg/1QnuEXUp3oM/s1600/Yellow-Duck-4.jpg", "picture: 13"),
("https://animals.sandiegozoo.org/sites/default/files/inline-images/llama.jpg", "picture: 14"),
("https://www.rover.com/blog/wp-content/uploads/2018/12/dog-sneeze-1-1024x945.jpg", "picture: 15"),
("https://www.readersdigest.ca/wp-content/uploads/sites/14/2016/05/cats-lick-themselves-to-clean-injuries.jpg", "picture: 16"),
("https://portal.andina.pe/EDPfotografia3/Thumbnail/2017/08/01/000439616W.jpg", "picture: 17"),
("https://upload.wikimedia.org/wikipedia/commons/6/6d/Metallic_shield_bug444.jpg", "picture: 18"),
("https://www.nydailynews.com/resizer/CEEJYohg9VZAqlqB4WEg0wTz4LA=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/TAU2JU73A5HNVJO7IPO5J3XJOU.jpg", "picture: 19"),
("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fusercontent1.hubstatic.com%2F11922486_f1024.jpg&f=1&nofb=1", "picture: 20");

INSERT INTO User_has_a (usr, av_id) VALUES
((SELECT User_id FROM Usr WHERE screen_name="James"),
(SELECT av_id FROM Avatar WHERE image_location="http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="Wilbur"),
(SELECT av_id FROM Avatar WHERE image_location="http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="Chap"),
(SELECT av_id FROM Avatar WHERE image_location="http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="Man"),
(SELECT av_id FROM Avatar WHERE image_location="http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="winghenge"),
(SELECT av_id FROM Avatar WHERE image_location="http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="Fred"),
(SELECT av_id FROM Avatar WHERE image_location="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wired.com%2Fwp-content%2Fuploads%2F2015%2F04%2F85120553.jpg&f=1&nofb=1" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="Mcdonald"),
(SELECT av_id FROM Avatar WHERE image_location="https://wallpapercave.com/wp/hbEVhfX.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="King"),
(SELECT av_id FROM Avatar WHERE image_location="http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="Hamantha"),
(SELECT av_id FROM Avatar WHERE image_location="http://2.bp.blogspot.com/_eIwMvvvkFQk/TTFbMEUfo0I/AAAAAAAAADw/ADqNO-VDiO0/s1600/cute+animals+%25280%2529.jpg" LIMIT 1)),
((SELECT User_id FROM Usr WHERE screen_name="Shaggy"),
(SELECT av_id FROM Avatar WHERE image_location="http://i.huffpost.com/gen/781204/thumbs/o-CUTE-ANIMALS-PHOTOS-facebook.jpg" LIMIT 1));

INSERT INTO Critter_has_a (critter, av_id) VALUES
((SELECT critter_id FROM Critter WHERE species="Cow"),
(SELECT av_id FROM Avatar WHERE image_location="https://www.ucdavis.edu/sites/default/files/styles/panopoly_image_full/public/home-site/blogs/one-health/blog-posts/2018/cow-field-one-health-uc-davis.jpg?itok=lrz5mpyq")),
((SELECT critter_id FROM Critter WHERE species="Horse"),
(SELECT av_id FROM Avatar WHERE image_location="https://www.pbs.org/wgbh/nova/media/original_images/horse-smile_2048x1152.jpg")),
((SELECT critter_id FROM Critter WHERE species="Duck"),
(SELECT av_id FROM Avatar WHERE image_location="http://4.bp.blogspot.com/-28JWho2EmXI/UDd98XboSuI/AAAAAAAAESg/1QnuEXUp3oM/s1600/Yellow-Duck-4.jpg")),
((SELECT critter_id FROM Critter WHERE species="Llama"),
(SELECT av_id FROM Avatar WHERE image_location="https://animals.sandiegozoo.org/sites/default/files/inline-images/llama.jpg")),
((SELECT critter_id FROM Critter WHERE species="Dog"),
(SELECT av_id FROM Avatar WHERE image_location="https://www.rover.com/blog/wp-content/uploads/2018/12/dog-sneeze-1-1024x945.jpg")),
((SELECT critter_id FROM Critter WHERE species="Cat"),
(SELECT av_id FROM Avatar WHERE image_location="https://www.readersdigest.ca/wp-content/uploads/sites/14/2016/05/cats-lick-themselves-to-clean-injuries.jpg")),
((SELECT critter_id FROM Critter WHERE species="Alpaca"),
(SELECT av_id FROM Avatar WHERE image_location="https://portal.andina.pe/EDPfotografia3/Thumbnail/2017/08/01/000439616W.jpg")),
((SELECT critter_id FROM Critter WHERE species="Bug"),
(SELECT av_id FROM Avatar WHERE image_location="https://upload.wikimedia.org/wikipedia/commons/6/6d/Metallic_shield_bug444.jpg")),
((SELECT critter_id FROM Critter WHERE species="Tiger"),
(SELECT av_id FROM Avatar WHERE image_location="https://www.nydailynews.com/resizer/CEEJYohg9VZAqlqB4WEg0wTz4LA=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/TAU2JU73A5HNVJO7IPO5J3XJOU.jpg")),
((SELECT critter_id FROM Critter WHERE species="Lion"),
(SELECT av_id FROM Avatar WHERE image_location="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fusercontent1.hubstatic.com%2F11922486_f1024.jpg&f=1&nofb=1"));


--Create Some admins
--Were only going to have 2 admins, since every user shouldnt be an admin
INSERT INTO `Admin`(`admin_id`) VALUES ((SELECT User_id FROM Usr WHERE screen_name="James"));
INSERT INTO `Admin`(`admin_id`) VALUES ((SELECT User_id FROM Usr WHERE screen_name="Hamantha"));

--Now we're going to have a user create a battle
--when a battle is created, we need to note who noted it
--we also need to link the creatures to the battle

INSERT INTO Battle (Quantity_one, Quantity_two, Size_one, Size_two, made_by) VALUES
(100, 1, "Truck", "ping pong ball", "Fred");

INSERT INTO Creates_a (battle, usr) VALUES ((SELECT LAST_INSERT_ID()), (SELECT User_id FROM Usr WHERE screen_name="Fred"));

INSERT INTO Takes_part_in (critter_one, critter_two, battle) VALUES
((SELECT critter_id FROM Critter WHERE species="Llama"),
(SELECT critter_id FROM Critter WHERE species="Bug"),
(SELECT LAST_INSERT_ID()));

INSERT INTO Battle (Quantity_one, Quantity_two, Size_one, Size_two, made_by) VALUES
(42, 24, "Car", "Semi", "Fred");

INSERT INTO Creates_a (battle, usr) VALUES ((SELECT LAST_INSERT_ID()), (SELECT User_id FROM Usr WHERE screen_name="Fred"));

INSERT INTO Takes_part_in (critter_one, critter_two, battle) VALUES
((SELECT critter_id FROM Critter WHERE species="Cow"),
(SELECT critter_id FROM Critter WHERE species="Cow"),
(SELECT LAST_INSERT_ID()));

INSERT INTO Battle (Quantity_one, Quantity_two, Size_one, Size_two, made_by) VALUES
(100, 99, "oven", "cup", "winghenge");

INSERT INTO Creates_a (battle, usr) VALUES ((SELECT LAST_INSERT_ID()), (SELECT User_id FROM Usr WHERE screen_name="winghenge"));

INSERT INTO Takes_part_in (critter_one, critter_two, battle) VALUES
((SELECT critter_id FROM Critter WHERE species="Llama"),
(SELECT critter_id FROM Critter WHERE species="Cow"),
(SELECT LAST_INSERT_ID()));

INSERT INTO Battle (Quantity_one, Quantity_two, Size_one, Size_two, made_by) VALUES
(1, 2, "book", "pencil", "Hamantha");

INSERT INTO Creates_a (battle, usr) VALUES ((SELECT LAST_INSERT_ID()), (SELECT User_id FROM Usr WHERE screen_name="Hamantha"));

INSERT INTO Takes_part_in (critter_one, critter_two, battle) VALUES
((SELECT critter_id FROM Critter WHERE species="Horse"),
(SELECT critter_id FROM Critter WHERE species="Duck"),
(SELECT LAST_INSERT_ID()));

--Users can vote on battles
INSERT INTO Votes_for (liked, battle, usr) VALUES
(True, (SELECT battle_id FROM Battle WHERE Size_One="book" AND Size_two="pencil" AND made_by="Hamantha"),(SELECT User_id FROM Usr WHERE screen_name="winghenge"));

INSERT INTO Votes_for (liked, battle, usr) VALUES
(False, (SELECT battle_id FROM Battle WHERE Size_One="book" AND Size_two="pencil" AND made_by="Hamantha"),(SELECT User_id FROM Usr WHERE screen_name="Fred"));

INSERT INTO Votes_for (liked, battle, usr) VALUES
(False, (SELECT battle_id FROM Battle WHERE Size_One="book" AND Size_two="pencil" AND made_by="Hamantha"),(SELECT User_id FROM Usr WHERE screen_name="Hamantha"));

INSERT INTO Votes_for (liked, battle, usr) VALUES
(False, (SELECT battle_id FROM Battle WHERE Size_One="oven" AND Size_two="cup" AND made_by="winghenge"),(SELECT User_id FROM Usr WHERE screen_name="winghenge"));

--Usersn can create comments
INSERT INTO Comments (comment_text, likes, dislikes) VALUES
("Hello!", 0, 0);


INSERT INTO Comments (comment_text, likes, dislikes) VALUES
("SHello!", 0, 0);


INSERT INTO Comments (comment_text, likes, dislikes) VALUES
("PotatoesAreCritterrsToo", 0, 0);


INSERT INTO Comments (comment_text, likes, dislikes) VALUES
("THisIsCool", 0, 0);


INSERT INTO Comments (comment_text, likes, dislikes) VALUES
("WordsWordsWords", 0, 0);
