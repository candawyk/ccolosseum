--Select all of the comments the user "winghenge" has made
Select Comments.comment_id as Comment_id, Comments.comment_text as Comment_Body from Comments join Makes_a on Makes_a.comment=Comments.comment_id where Makes_a.usr=(Select User_id from Usr where screen_name="winghenge");

--Select all of the comments the user "winghenge"has liked/disliked
Select Likes.id as Like_id, Likes.comment as Comment_id, Likes.liked as Likes from Likes Where Likes.usr = (select User_id from Usr where screen_name="winghenge");

--Get information on all of the users, and how many battles they have made
Select Usr.User_id as ID, Usr.screen_name as Screen_name, count(Creates_a.id) as Number_of_Battles from Usr join Creates_a on Creates_a.usr=Usr.User_id
group by ID
Union

Select Usr.User_id as ID, Usr.screen_name as Screen_name,  0 as Number_of_Battles from Usr where Usr.User_id not in
(
Select Usr.User_id as ID from Usr join Creates_a on Creates_a.usr=Usr.User_id
)

ORDER By ID;

--Get and rank all of the battles by number of favorites
Select Battle.battle_id as Battle_id, count(Favorites.battle) as Number_of_Favorites from Battle join Favorites on Favorites.battle=Battle.battle_id
group by Battle_id
union

Select Battle.battle_id as Battle_id, 0 as Number_of_Favorites from Battle where Battle.battle_id not in

(
Select Battle.battle_id as Battle_id from Battle join Favorites on Favorites.battle=Battle.battle_id

)

Order By Number_of_Favorites DESC

;

--Get and rank all of the battles by number of combined votes
Select Battle.battle_id as Battle_id, count(Votes_for.battle) as Number_of_Votes from Battle join Votes_for on Votes_for.battle=Battle.battle_id

group by Battle_id

union

Select Battle.battle_id as Battle_id, 0 as Number_of_Votes from Battle where Battle.battle_id not in

(
Select Battle.battle_id as Battle_id from Battle join Votes_for on Votes_for.battle=Battle.battle_id
)

Order By Number_of_Votes DESC

;

--get how many times a creature has been in a battle
--rank from most to least
Select Critter.species as Species, count(Takes_part_in.battle) as Number_of_Battles from Critter join Takes_part_in on Critter.critter_id=Takes_part_in.critter_one or  Critter.critter_id=Takes_part_in.critter_two
group by Species

union

Select Critter.species as Species, 0 as Number_of_Battles from Critter where Critter.species not in

(
Select Critter.species as Species from Critter join Takes_part_in on Critter.critter_id=Takes_part_in.critter_one or  Critter.critter_id=Takes_part_in.critter_two
)

order by Number_of_Battles DESC;


--Select all of the admins
Select Usr.screen_name as Screen_Name_of_Admin from Usr join Admin on Usr.User_id=Admin.admin_id;

--Get all of the paths to avatars, and show if its an avatar for a user or a critter
select "user" as Type, Usr.screen_name as Name_or_Species, Avatar.image_location as Path from User_has_a join Usr on User_has_a.usr=Usr.User_id join Avatar on Avatar.av_id=User_has_a.av_id

Union

select "critter" as Type, Critter.species as Name_or_Species, Avatar.image_location as Path from Critter_has_a join Critter on Critter_has_a.critter=Critter.critter_id join Avatar on Avatar.av_id=Critter_has_a.av_id;

