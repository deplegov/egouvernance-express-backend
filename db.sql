CREATE SEQUENCE societe_sequence
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 999999999
    NOCACHE
    NOCYCLE;
CREATE TABLE societe (
    id NUMBER(5) PRIMARY KEY,
    nom VARCHAR2(50),
    nif VARCHAR2(50),
    stat VARCHAR2(50),
    password VARCHAR2(255)
);
CREATE SEQUENCE appel_d_offre_sequence
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 999999999
    NOCACHE
    NOCYCLE;
CREATE TABLE appel_d_offre (
    id NUMBER(5) PRIMARY KEY,
    reference VARCHAR2(50),
    titre VARCHAR2(200),
    description CLOB,
    date_d_emission DATE,
    date_limite DATE
);
CREATE TABLE soumission_ao (
    documents VARCHAR2(1000),
    date_soumission DATE,
    statut VARCHAR2(50),
    societe_id NUMBER(5),
    appel_d_offre_id NUMBER(5),
    FOREIGN KEY (societe_id) REFERENCES societe(id),
    FOREIGN KEY (appel_d_offre_id) REFERENCES appel_d_offre(id)
);
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
    societe_id NUMBER(5),
    FOREIGN KEY (societe_id) REFERENCES societe(id)
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
    description CLOB,
    date_de_publication DATE
);
CREATE TABLE commentaire (
    contenu CLOB,
    date_com DATE,
    utilisateur_id NUMBER(5),
    article_id NUMBER(5),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
    FOREIGN KEY (article_id) REFERENCES article(id)
);

insert into article (id,titre,description,date_de_publication) values (article_sequence.NEXTVAL,'article1','ceci est un test',SYSDATE);
insert into article (id,titre,description,date_de_publication) values (article_sequence.NEXTVAL,'article2','ceci est un test',SYSDATE);

insert into societe values (societe_sequence.NEXTVAL,'societe1','1234','1234','mdp');

insert into utilisateur values (utilisateur_sequence.NEXTVAL,'user1','user1','1234','mdp','role','type',2);

insert into commentaire values ('ceci est un test',SYSDATE,3,1);
insert into commentaire values ('ceci est un test',SYSDATE,3,2);

insert into appel_d_offre values (appel_d_offre_sequence.NEXTVAL,'ref1','titre','description test',SYSDATE,SYSDATE);

insert into soumission_ao values ('',SYSDATE,'statut',2,2);