-- CREATE SEQUENCE societe_sequence
--     START WITH 1
--     INCREMENT BY 1
--     MAXVALUE 999999999
--     NOCACHE
--     NOCYCLE;
-- CREATE TABLE societe (
--     id NUMBER(5) PRIMARY KEY,
--     nom VARCHAR2(50),
--     nif VARCHAR2(50),
--     stat VARCHAR2(50),
--     password VARCHAR2(255)
-- );
-- CREATE SEQUENCE appel_d_offre_sequence
--     START WITH 1
--     INCREMENT BY 1
--     MAXVALUE 999999999
--     NOCACHE
--     NOCYCLE;
-- CREATE TABLE appel_d_offre (
--     id NUMBER(5) PRIMARY KEY,
--     reference VARCHAR2(50),
--     titre VARCHAR2(200),
--     description CLOB,
--     date_d_emission DATE,
--     date_limite DATE
-- );
-- CREATE TABLE soumission_ao (
--     documents VARCHAR2(1000),
--     date_soumission DATE,
--     statut VARCHAR2(50),
--     societe_id NUMBER(5),
--     appel_d_offre_id NUMBER(5),
--     FOREIGN KEY (societe_id) REFERENCES societe(id),
--     FOREIGN KEY (appel_d_offre_id) REFERENCES appel_d_offre(id)
-- );
CREATE SEQUENCE utilisateur_sequence
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 999999999
    NOCACHE
    NOCYCLE;
CREATE TABLE utilisateur (
    id NUMBER(5) PRIMARY KEY,
    nom VARCHAR2(50),
    prenom VARCHAR2(50),
    email VARCHAR2(50),
    password VARCHAR2(255),
    role VARCHAR2(50),
    type VARCHAR2(50),
    societe_id VARCHAR2(255),
    valide NUMBER DEFAULT 0,
    active NUMBER DEFAULT 1
    -- FOREIGN KEY (societe_id) REFERENCES societe(id)
);
CREATE SEQUENCE article_sequence
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 999999999
    NOCACHE
    NOCYCLE;
CREATE TABLE article (
    id NUMBER(5) PRIMARY KEY,
    titre VARCHAR2(200),
    description VARCHAR2(4000),
    date_de_publication DATE
);
CREATE TABLE commentaire (
    contenu VARCHAR2(4000),
    date_com DATE DEFAULT SYSDATE,
    utilisateur_id NUMBER(5),
    article_id NUMBER(5),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
    FOREIGN KEY (article_id) REFERENCES article(id)
);

-- CREATE SEQUENCE critere_sequence
--     START WITH 1
--     INCREMENT BY 1
--     MAXVALUE 999999999
--     NOCACHE
--     NOCYCLE;
-- CREATE TABLE critere (
--     id NUMBER(5) PRIMARY KEY,
--     intitule VARCHAR2(200),
--     description CLOB,
--     appel_d_offre_id NUMBER(5) NOT NULL,
--     FOREIGN KEY (appel_d_offre_id) REFERENCES appel_d_offre(id)
-- );

insert into article (id,titre,description,date_de_publication) values (article_sequence.NEXTVAL,'article1','ceci est un test 1',SYSDATE);
insert into article (id,titre,description,date_de_publication) values (article_sequence.NEXTVAL,'article2','ceci est un test 2',SYSDATE);

insert into article (id,titre,description,date_de_publication) values (
    article_sequence.NEXTVAL,
    'PALAIS D''AMBOHITSOROHITRA : RENCONTRE AVEC UNE DÉLÉGATION CORÉENNE',
    'Après son déplacement dans la Région Vakinankaratra ce 28 août 2023, le Président de la République Andry Rajoelina a reçu au Palais d'État d'Ambohitsorohitra, une délégation de la République de Corée dirigée par M. YOON Sang Jick, envoyé spécial du Président de la République de Corée, Secrétaire Général du Comité de candidature pour l''exposition universelle 2030 à Busan. Une rencontre qui vise à renforcer la coopération bilatérale entre les deux pays et à explorer de nouvelles opportunités de partenariat économique.
Madagascar a été choisi comme première destination par l''émissaire du Président coréen qui est accompagné pour ce déplacement, par des hauts responsables du top 10 des entreprises coréennes, qui sont tous des leaders mondiaux. Ce qui souligne l''importance de la place qu''occupe la Grande Île dans le développement des relations entre l''Afrique et la Corée du Sud.'
    ,SYSDATE);

insert into article (id,titre,description,date_de_publication) values (
    article_sequence.NEXTVAL,
    'Coup d''envoi de la 11ème édition des jeux des îles de l''Océan Indien.',
    'La cérémonie d''ouverture des jeux des îles de l''Océan Indien s''est tenue ce 25 août 2023 au Kianja Barea Mahamasina. Une cérémonie grandiose sous la houlette du Président de la République Andry Rajoelina et de son épouse Mialy Rajoelina. Parmi les invités d''honneur de la cérémonie figurent le Président de l''Union des Comores, Azali Assoumani, le Président des Seychelles, Wavel Ramkalawan, ainsi que le Président de l''Île Maurice, Prithvirajsing Roopun. Un des points d''orgue de la cérémonie fut le défilé de près de 4213 athlètes de la Réunion, l''île Maurice, les Seychelles, les Comores, Mayotte, les Maldives et de Madagascar.

S''en est suivi de la série d''allocution à laquelle ont pris part le Ministre de la Jeunesse et des Sports, André Resampa, le Président du Conseil Internationale des Jeux des Îles, Antonio Gopal et le Président de la République Andry Rajoelina. Après avoir salué l''ensemble des athlètes malagasy et réitéré ses bénédictions, le Président Andry Rajoelina a appelé à une minute de silence suite au décès de plusieurs personnes après une bousculade devant un portail du Stade. Le Premier Ministre ainsi que plusieurs membres du Gouvernement se sont d''ailleurs immédiatement rendus au chevet des victimes. Les personnes blessées seront prises en charge par l''Etat. Le Chef de l''Etat Andry Rajoelina a adressé un message de réconfort aux victimes et a saisi l''occasion pour interpeller les différents responsables afin qu''un tel drame ne puisse plus se reproduire.'
    ,SYSDATE);

insert into article (id,titre,description,date_de_publication) values (
    article_sequence.NEXTVAL,
    'Antsiranana : Accueil de la flamme des Jeux des Île de l''Océan Indien',
    'Le Président de la République Andry Rajoelina a entamé la deuxième journée de son déplacement à Antsiranana par une visite au camp pénal d''Andaloasy à Antsiranana, ce samedi 12 août 2023. L''amélioration des conditions carcérales fait partie des défis lancés par le Président Andry Rajoelina. Des reformes ont d''ailleurs été apportées au sein de l''Administration pénitentiaire, pour assurer une meilleure réintégration des prisonniers au niveau de la société après leur incarcération. Ceci à travers diverses formations telles que les formations agricoles, la menuiserie ou la couture pour les femmes détenues.

Concernant le camp pénal d''Andaloasy, le terrain a été exploité par l''Administration pénitentiaire depuis 1982. A court et moyen terme, l''objectif y est d''améliorer en qualité et en quantité l''alimentation des détenues. En revanche, pour le long terme, il s''agit de garantir l''autosuffisance alimentaire dans la prison. Les détenus sont sélectionnés en fonction de leurs bonnes conduites. Au début, ils reçoivent une formation sur l''agriculture et travaillent par la suite sur une surface de 108Ha où ils cultivent le riz, le maïs, le manioc et des légumineuses. Le Chef de l''Etat a profité de cette descente pour remettre des uniformes aux prisonniers sélectionnés.'
    ,SYSDATE);

-- insert into societe values (societe_sequence.NEXTVAL,'societe1','1234','1234','mdp');

insert into utilisateur (id,nom,prenom,email,password,role,type) values 
(utilisateur_sequence.NEXTVAL,'Rabenantoandro','Luc','luc.rabe@gmail.com','$10$D0l3RxGl9PAjzUegDbx76.l998RVp9IzIOQxHKNflqvV.GtZ9tInK','Citoyen','Utilisateur');

insert into commentaire (contenu, utilisateur_id, article_id) values ('ceci est un test 1',2,2);
insert into commentaire (contenu, utilisateur_id, article_id) values ('ceci est un test 2',2,3);

-- insert into appel_d_offre values (appel_d_offre_sequence.NEXTVAL,'ref1','titre','description test',SYSDATE,SYSDATE);

-- insert into soumission_ao values ('',SYSDATE,'statut',2,2);