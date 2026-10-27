drop database if exists retro_games;
create database retro_games;
use retro_games;
create table jogos(
    id int not null primary key auto_increment,
    jogo varchar (50) not null,
    desenvolvedora varchar (50) not null,
    genero varchar (50) not null,
    imagem text (500) not null,
    preco decimal(10,2) not null
);
describe jogos;

use retro_games;
insert into jogos (jogo, descricao, desenvolvedora, genero, imagem, preco) values
("Zelda Ocarina of Time", "Link, um garoto da floresta que sai de sua casa para combater o maligno Ganonforf", "Nintendo", "Aventura", "https://upload.wikimedia.org/wikipedia/pt/d/db/The_Legend_of_Zelda_Ocarina_of_Time_3D_arte_de_capa_Europa.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original", 67.00),
("Pokémon FireRed", "Red completa seus 10 anos e pode escolher um Pokémon para o acompanhar em sua jornada", "GameFreak", "RPG de turnos", "https://m.media-amazon.com/images/I/71iLh5opvHL._AC_UF1000,1000_QL80_.jpg", 88.00),
("Kirby & the Amazing Mirror", "Kirby, uma criatura rosa que combate o mal através de mundos alternativos em espelhos", "HAL Laboratory", "Platafotma", "https://upload.wikimedia.org/wikipedia/en/0/0b/Kirby_%26_the_Amazing_Mirror.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original", 42.00);

select * from jogos;