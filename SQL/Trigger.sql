delimiter $$
CREATE TRIGGER `test_2`
AFTER INSERT
oN `Battle` FOR EACH row

BEGIN

DECLARE n_id int(11);
SELECT battle INTO lb from Votes_for ORDER BY id DESC LIMIT 1;




END$$
DELIMITER ;
