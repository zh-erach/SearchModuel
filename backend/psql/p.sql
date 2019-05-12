//查看可看人员的信息
select t2.user_name,t2.rname from
	(select rname from v_user_role where user_name='10001') t1,
	(select * from v_user_role) t2
where t1.rname=t2.rname and t2.user_name like '%1%';
//查看可看资源的信息
select * from
    (select r_id,r_name,r_user,r_administrator,r_category,r_location,r_configure,r_use from
	    (select f_gid,t2.* from
		    (select f_gid,f_uname from t_user_group) t1,
		    (select * from t_resources) t2
	    where t1.f_uname=t2.r_creator)t3,
	    (select f_gid from t_user_group where f_uname='10002') t4
    where t4.f_gid=t3.f_gid and t3.r_category ='服务器') t6
where t6.r_name like '%服%';
