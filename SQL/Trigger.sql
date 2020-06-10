-- Trigger for: Votes_for
-- AFTER INSERT
-- Increments votes_one or votes_two depending on liked value (0 or 1)

BEGIN
	IF (New.battle IS NOT NULL) AND New.liked = 0 THEN
    	UPDATE Battle
        SET votes_one = votes_one + 1
        WHERE New.battle = Battle.battle_id;
    END IF;

 	IF (New.battle IS NOT NULL) AND New.liked = 1 THEN
    	UPDATE Battle
        SET votes_two = votes_two + 1
        WHERE New.battle = Battle.battle_id;
    END IF;

END
