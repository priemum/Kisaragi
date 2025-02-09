PGDMP         )                x           d9281dmamjb796     11.8 (Ubuntu 11.8-1.pgdg16.04+1)    12.2     )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ,           1262    3163436    d9281dmamjb796    DATABASE     �   CREATE DATABASE d9281dmamjb796 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE d9281dmamjb796;
                rzfvmdaktlsida    false            �            1259    23745933 	   blacklist    TABLE     T   CREATE TABLE public.blacklist (
    "guild id" text NOT NULL,
    "user id" text
);
    DROP TABLE public.blacklist;
       public            rzfvmdaktlsida    false            �            1259    23456712 
   collectors    TABLE     �   CREATE TABLE public.collectors (
    message bigint NOT NULL,
    embeds text[],
    collapse text,
    page integer,
    help boolean,
    download boolean
);
    DROP TABLE public.collectors;
       public            rzfvmdaktlsida    false            �            1259    23456718    commands    TABLE       CREATE TABLE public.commands (
    command text NOT NULL,
    aliases text[],
    path text,
    cooldown integer,
    help text,
    examples text,
    "guild only" text,
    random text,
    permission text,
    "bot permission" text,
    usage integer
);
    DROP TABLE public.commands;
       public            rzfvmdaktlsida    false            �            1259    23456742    guilds    TABLE     �	  CREATE TABLE public.guilds (
    "guild id" bigint NOT NULL,
    name text,
    members integer,
    icon text,
    splash text,
    region text,
    owner text,
    "owner id" bigint,
    games text[],
    banner text,
    usage text,
    "channel list" text[],
    "category list" text[],
    "user list" text[],
    "role list" text[],
    "emoji list" text[],
    prefix text,
    "mod log" text,
    "message log" text,
    "user log" text,
    "member log" text,
    pinboard text,
    "nsfw pinboard" text,
    "yt channels" text[],
    "twitch channels" text[],
    "global chat" text,
    linked text[],
    gallery text[],
    starboard text,
    "star threshold" integer,
    "star emoji" text,
    "mute role" text,
    "restricted role" text,
    "warn one" text,
    "warn two" text,
    "mod role" text,
    "admin role" text,
    "self roles" text[],
    "reaction roles" text[],
    "emoji roles" text[],
    "warn log" text[],
    "warn penalty" text,
    "warn threshold" integer,
    cases text[],
    "blocked words" text[],
    "disabled categories" text[],
    "pfp ban toggle" text,
    "leaver ban toggle" text,
    "ascii name toggle" text,
    "default channel" text,
    "block match" text,
    "block toggle" text,
    "link ban" text,
    asterisk text,
    invite text,
    "self promo" text,
    "everyone ban toggle" text,
    "verify toggle" text,
    "verify role" text,
    "captcha type" text,
    "captcha color" text,
    difficulty text,
    links text,
    anime text,
    pfp text,
    weeb text,
    normie text,
    ignored text[],
    response text,
    "welcome channel" text,
    "welcome message" text,
    "welcome toggle" text,
    "welcome bg text" text,
    "welcome bg color" text,
    "welcome bg images" text[],
    "welcome bg toggle" text,
    "leave channel" text,
    "leave message" text,
    "leave toggle" text,
    "leave bg text" text,
    "leave bg color" text,
    "leave bg images" text[],
    "leave bg toggle" text,
    permissions text,
    "embed colors" text[],
    voice text,
    "point range" integer[],
    "point threshold" integer,
    "level message" text,
    "point timeout" integer,
    "point toggle" text,
    scores text[],
    "level roles" text[],
    "level channels" text[],
    "image channels" text[],
    "dropbox folders" text[],
    "google albums" text[],
    "notify toggle" text,
    auto text[],
    birthdays text[],
    "birthday channel" text,
    "birthday message" text,
    "birthday toggle" text,
    "guild log" text,
    source text[]
);
    DROP TABLE public.guilds;
       public            rzfvmdaktlsida    false            �            1259    23458205    misc    TABLE     �   CREATE TABLE public.misc (
    "user id" bigint NOT NULL,
    "osu name" text,
    "global bans" text,
    bookmarks text,
    playlists text,
    birthday text,
    usage text,
    username text NOT NULL
);
    DROP TABLE public.misc;
       public            rzfvmdaktlsida    false            �            1259    24037151    oauth2    TABLE     o  CREATE TABLE public.oauth2 (
    "user id" text NOT NULL,
    "user tag" text,
    "access token" text,
    "refresh token" text,
    email text,
    connections text[],
    guilds text[],
    "twitter token" text,
    "twitter secret" text,
    "screen name" text,
    "twitter id" text,
    "reddit token" text,
    "reddit refresh" text,
    "reddit name" text
);
    DROP TABLE public.oauth2;
       public            rzfvmdaktlsida    false            �            1259    24007901    pixiv    TABLE     D   CREATE TABLE public.pixiv (
    id text NOT NULL,
    embed text
);
    DROP TABLE public.pixiv;
       public            rzfvmdaktlsida    false            �            1259    24192835    twitch    TABLE     M   CREATE TABLE public.twitch (
    channel text NOT NULL,
    config text[]
);
    DROP TABLE public.twitch;
       public            rzfvmdaktlsida    false            �            1259    23908684    yt    TABLE     N   CREATE TABLE public.yt (
    "channel id" text NOT NULL,
    config text[]
);
    DROP TABLE public.yt;
       public            rzfvmdaktlsida    false            �           2606    23925881    blacklist blacklist_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.blacklist
    ADD CONSTRAINT blacklist_pkey PRIMARY KEY ("guild id");
 B   ALTER TABLE ONLY public.blacklist DROP CONSTRAINT blacklist_pkey;
       public            rzfvmdaktlsida    false    200            �           2606    23925889    collectors collectors_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.collectors
    ADD CONSTRAINT collectors_pkey PRIMARY KEY (message);
 D   ALTER TABLE ONLY public.collectors DROP CONSTRAINT collectors_pkey;
       public            rzfvmdaktlsida    false    196            �           2606    23456965    commands commands_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.commands
    ADD CONSTRAINT commands_pkey PRIMARY KEY (command);
 @   ALTER TABLE ONLY public.commands DROP CONSTRAINT commands_pkey;
       public            rzfvmdaktlsida    false    197            �           2606    23925865    guilds guild info_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.guilds
    ADD CONSTRAINT "guild info_pkey" PRIMARY KEY ("guild id");
 B   ALTER TABLE ONLY public.guilds DROP CONSTRAINT "guild info_pkey";
       public            rzfvmdaktlsida    false    198            �           2606    23458212    misc misc_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.misc
    ADD CONSTRAINT misc_pkey PRIMARY KEY ("user id");
 8   ALTER TABLE ONLY public.misc DROP CONSTRAINT misc_pkey;
       public            rzfvmdaktlsida    false    199            �           2606    24039166    oauth2 oauth2_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.oauth2
    ADD CONSTRAINT oauth2_pkey PRIMARY KEY ("user id");
 <   ALTER TABLE ONLY public.oauth2 DROP CONSTRAINT oauth2_pkey;
       public            rzfvmdaktlsida    false    203            �           2606    24007908    pixiv pixiv_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.pixiv
    ADD CONSTRAINT pixiv_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.pixiv DROP CONSTRAINT pixiv_pkey;
       public            rzfvmdaktlsida    false    202            �           2606    24200646    twitch twitch_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.twitch
    ADD CONSTRAINT twitch_pkey PRIMARY KEY (channel);
 <   ALTER TABLE ONLY public.twitch DROP CONSTRAINT twitch_pkey;
       public            rzfvmdaktlsida    false    204            �           2606    23908691 
   yt yt_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.yt
    ADD CONSTRAINT yt_pkey PRIMARY KEY ("channel id");
 4   ALTER TABLE ONLY public.yt DROP CONSTRAINT yt_pkey;
       public            rzfvmdaktlsida    false    201           