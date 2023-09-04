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