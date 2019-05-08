/*该表用于资源管理模块的事件管理子模块，需要用户表的用户名以及资源表的资源名作外键*/
create table case(
    case_number             integer primary key ,                                               --事件编号
    user_name               varchar(20),                                                        --操作用户，根据用户名取得角色，调出可操作资源(是否需要添加该属性列)
    case_name               varchar(50),                                                        --事件名称
    operate_time            date default now(),                                                 --操作时间，不填写时默认为创建该数据的时间(是否使用默认时间)
    operate_object          varchar(50),                                                        --操作主体
    operate_position        varchar(50),                                                        --操作位置
    case_detail             text,                                                               --详细过程
    foreign key (user_name) references 用户表(用户名) on delete cascade on update cascade,         --(是否级联删除,更新)
    foreign key (operate_object) references 资源表(资源名) on delete cascade on update cascade     --(是否级联删除,更新)
);