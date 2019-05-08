--资源类别
create table Resource_Class (
       id serial primary key,  --每个类别的ID
       name varchar(100) NOT NULL,  --类别名称
       parent integer references  Resource_Class(id) on delete cascade --当前类别的父类别
);