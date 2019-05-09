

--人员的类别
create table People_Class (
       id serial primary key,  --每个类别的ID
       name varchar(100) NOT NULL unique  --类别名称
);
--人员对应类别
create table People_Relationship (
       uid int ,  --每个人员的ID
       sid int,  --类别ID
       foreign key (uid) references users(uid) on delete cascade , 
       foreign key (sid) references People_Class (id) on delete cascade 
);




