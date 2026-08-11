create table students(
    id serial primary key,
    student_id varchar(500) unique not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(255) unique not null,
    contact_number varchar(20),
    date_of_birth date not null default current_date,
    status varchar(50) default 'Enrolled',
    profile_image_url text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp

);
