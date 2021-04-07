update coupons set number_of = (case WHEN (select number_of from coupons where id ='23f13847-e33b-42b3-badb-a287f48df736') > 0 then 
(select number_of from coupons where id ='23f13847-e33b-42b3-badb-a287f48df736') -1 else 0 end ) where id ='23f13847-e33b-42b3-badb-a287f48df736'
and exp_date > '2021-09-12' and start_date < '2021-04-06' RETURNING code;