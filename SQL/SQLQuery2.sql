create procedure get_teachers_by_pulpit @p char(20) as begin
select * from teacher where pulpit =@p;
end;