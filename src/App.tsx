import { useState, useEffect, useRef } from "react";

// --- DONNÉES VOCABULAIRE (Avec astuces intégrées) ---
// Note : Le Chapitre 1 est complet avec les astuces. Remplace la suite par les listes que je te fournirai.
const VOCAB = [
  {"id":0,"en":"academic","fr":"universitaire","ch":"Ch.1 – Mots essentiels", "tip":"Faux-ami ! Ne veut pas dire 'scolaire' mais bien 'universitaire'."},
  {"id":1,"en":"actual","fr":"réel, véritable","ch":"Ch.1 – Mots essentiels", "tip":"Faux-ami très classique. Ne veut pas dire 'actuel' (current)."},
  {"id":2,"en":"allotment","fr":"attribution, distribution","ch":"Ch.1 – Mots essentiels", "tip":"Pense au mot 'lot' : on distribue des lots."},
  {"id":3,"en":"amount","fr":"montant","ch":"Ch.1 – Mots essentiels", "tip":"Un 'amount' (montant) qui 'monte'."},
  {"id":4,"en":"applicant","fr":"candidat","ch":"Ch.1 – Mots essentiels", "tip":"Celui qui 'applique' (apply) pour un emploi."},
  {"id":5,"en":"appoint","fr":"nommer","ch":"Ch.1 – Mots essentiels", "tip":"On 'pointe' quelqu'un du doigt pour le choisir/nommer."},
  {"id":6,"en":"average","fr":"moyen, moyenne","ch":"Ch.1 – Mots essentiels", "tip":"À retenir par cœur (très utilisé en stats/finance)."},
  {"id":7,"en":"ban","fr":"interdit(adj), interdire(v)","ch":"Ch.1 – Mots essentiels", "tip":"Pense à 'bannir'."},
  {"id":8,"en":"bill","fr":"facture, projet de loi","ch":"Ch.1 – Mots essentiels", "tip":"Double sens crucial : payer le 'bill' (facture) ou voter le 'bill' (loi)."},
  {"id":9,"en":"body","fr":"organisme","ch":"Ch.1 – Mots essentiels", "tip":"Le 'corps' (body) social ou institutionnel = un organisme."},
  {"id":10,"en":"blueprint","fr":"projet","ch":"Ch.1 – Mots essentiels", "tip":"Historiquement, les plans d'architecte étaient imprimés en bleu (blue print)."},
  {"id":11,"en":"borrow (from)","fr":"emprunter (à)","ch":"Ch.1 – Mots essentiels", "tip":"À ne pas confondre avec 'lend' (prêter)."},
  {"id":12,"en":"calculation","fr":"calcul","ch":"Ch.1 – Mots essentiels", "tip":"Transparent avec le français."},
  {"id":13,"en":"cancel","fr":"annuler","ch":"Ch.1 – Mots essentiels", "tip":"Pense à la 'cancel culture' (culture de l'annulation)."},
  {"id":14,"en":"carry out","fr":"effectuer","ch":"Ch.1 – Mots essentiels", "tip":"'Porter dehors' : mener une tâche à son terme."},
  {"id":15,"en":"ceiling","fr":"plafond","ch":"Ch.1 – Mots essentiels", "tip":"Le contraire du sol (floor). Pense au 'glass ceiling' (plafond de verre)."},
  {"id":16,"en":"compulsory","fr":"obligatoire","ch":"Ch.1 – Mots essentiels", "tip":"Contient l'idée de 'compulsion', on est forcé de le faire."},
  {"id":17,"en":"consist of","fr":"être composé de","ch":"Ch.1 – Mots essentiels", "tip":"'Consister en' -> être composé de."},
  {"id":18,"en":"consumption","fr":"consommation","ch":"Ch.1 – Mots essentiels", "tip":"Transparent : consumer = consommer."},
  {"id":19,"en":"contractor","fr":"entrepreneur / partie contractante","ch":"Ch.1 – Mots essentiels", "tip":"Celui qui signe le 'contrat' pour faire les travaux."},
  {"id":20,"en":"convenient","fr":"pratique","ch":"Ch.1 – Mots essentiels", "tip":"Un truc 'convenable' est souvent très pratique."},
  {"id":21,"en":"core business","fr":"coeur de métier","ch":"Ch.1 – Mots essentiels", "tip":"'Core' = le noyau, le centre."},
  {"id":22,"en":"current","fr":"courant, actuel","ch":"Ch.1 – Mots essentiels", "tip":"Le vrai mot pour dire 'actuel' en anglais !"},
  {"id":23,"en":"dealer","fr":"concessionnaire, distributeur","ch":"Ch.1 – Mots essentiels", "tip":"Celui qui 'deal' (négocie) des produits légaux, comme des voitures."},
  {"id":24,"en":"draft","fr":"rédiger, brouillon","ch":"Ch.1 – Mots essentiels", "tip":"Pense au vent (courant d'air = draft) qui fait voler tes brouillons."},
  {"id":25,"en":"drawback","fr":"inconvénient","ch":"Ch.1 – Mots essentiels", "tip":"Quelque chose qui te 'tire' (draw) en 'arrière' (back)."},
  {"id":26,"en":"entail","fr":"entrainer","ch":"Ch.1 – Mots essentiels", "tip":"Pense à la queue (tail) : ce qui suit logiquement."},
  {"id":27,"en":"expenditure","fr":"dépense","ch":"Ch.1 – Mots essentiels", "tip":"Ce qu'on 'expend' (dépense)."},
  {"id":28,"en":"forecast","fr":"prévision","ch":"Ch.1 – Mots essentiels", "tip":"'Fore' (avant) + 'cast' (jeter) = jeter un œil vers l'avenir."},
  {"id":29,"en":"fund","fr":"fonds","ch":"Ch.1 – Mots essentiels", "tip":"Transparent (pense au crowdfunding)."},
  {"id":30,"en":"go bankrupt","fr":"faire faillite","ch":"Ch.1 – Mots essentiels", "tip":"La 'banque' est 'rompue' (rupt)."},
  {"id":31,"en":"grant","fr":"accorder, garantir, subvention","ch":"Ch.1 – Mots essentiels", "tip":"Pense à Hugh Grant qui t'accorde une faveur."},
  {"id":32,"en":"hold","fr":"détenir / statuer","ch":"Ch.1 – Mots essentiels", "tip":"Tenir physiquement (détenir), ou tenir une position juridique (statuer)."},
  {"id":33,"en":"insurance","fr":"assurance","ch":"Ch.1 – Mots essentiels", "tip":"On est 'sûr' (sure) quand on est assuré."},
  {"id":34,"en":"investment","fr":"investissement, placement","ch":"Ch.1 – Mots essentiels", "tip":"Transparent."},
  {"id":35,"en":"lack","fr":"manque, manquer de","ch":"Ch.1 – Mots essentiels", "tip":"Pense au lac (lack) qui s'assèche : il manque d'eau."},
  {"id":36,"en":"leeway","fr":"marge de manœuvre","ch":"Ch.1 – Mots essentiels", "tip":"'Lee' (abri du vent) + 'way' : avoir de l'espace libre."},
  {"id":37,"en":"manage","fr":"diriger, gérer, réussir","ch":"Ch.1 – Mots essentiels", "tip":"D'où vient le mot 'manager' en français."},
  {"id":38,"en":"mandatory","fr":"obligatoire","ch":"Ch.1 – Mots essentiels", "tip":"Issu du 'mandat' : on t'ordonne de le faire."},
  {"id":39,"en":"market share","fr":"part(s) de marché","ch":"Ch.1 – Mots essentiels", "tip":"'Market' (marché) + 'share' (partager/part)."},
  {"id":40,"en":"memorandum","fr":"note de service","ch":"Ch.1 – Mots essentiels", "tip":"Un truc pour la 'mémoire'."},
  {"id":41,"en":"minus","fr":"moins","ch":"Ch.1 – Mots essentiels", "tip":"Même racine latine."},
  {"id":42,"en":"monies","fr":"sommes d'argent","ch":"Ch.1 – Mots essentiels", "tip":"Pluriel juridique archaïque de money."},
  {"id":43,"en":"means","fr":"moyen","ch":"Ch.1 – Mots essentiels", "tip":"Le moyen (mean) d'arriver à ses fins."},
  {"id":44,"en":"notice","fr":"avis, préavis, convocation","ch":"Ch.1 – Mots essentiels", "tip":"On te 'notifie' (notice) que tu dois partir (préavis)."},
  {"id":45,"en":"outsource","fr":"externaliser","ch":"Ch.1 – Mots essentiels", "tip":"Chercher la 'source' en 'dehors' (out)."},
  {"id":46,"en":"paperwork","fr":"tâche administrative, formalités","ch":"Ch.1 – Mots essentiels", "tip":"Le travail (work) du papier (paper)."},
  {"id":47,"en":"poll","fr":"vote","ch":"Ch.1 – Mots essentiels", "tip":"Pense au pôle (poll) où on se rassemble pour voter."},
  {"id":48,"en":"procurement","fr":"contrat public","ch":"Ch.1 – Mots essentiels", "tip":"L'action de se 'procurer' quelque chose pour l'État."},
  {"id":49,"en":"range","fr":"gamme","ch":"Ch.1 – Mots essentiels", "tip":"Une 'rangée' d'options."},
  {"id":50,"en":"ratio","fr":"ratio","ch":"Ch.1 – Mots essentiels", "tip":"Mot transparent (latin)."},
  {"id":51,"en":"record","fr":"enregistrer, archive","ch":"Ch.1 – Mots essentiels", "tip":"Pense au bouton rouge 'REC' sur une caméra."},
  {"id":52,"en":"red tape","fr":"paperasserie, bureaucratie","ch":"Ch.1 – Mots essentiels", "tip":"Le ruban rouge (red tape) qui attachait les vieux dossiers juridiques."},
  {"id":53,"en":"relevant","fr":"pertinent, applicable","ch":"Ch.1 – Mots essentiels", "tip":"Un argument qui se 'relève' dans un débat car il est pertinent."},
  {"id":54,"en":"resign","fr":"démissionner","ch":"Ch.1 – Mots essentiels", "tip":"On 'résigne' son contrat."},
  {"id":55,"en":"resignation","fr":"démission","ch":"Ch.1 – Mots essentiels", "tip":"Donner sa résignation."},
  {"id":56,"en":"rule","fr":"règle, règlement","ch":"Ch.1 – Mots essentiels", "tip":"Comme la règle pour tracer un trait, ou la règle de droit."},
  {"id":57,"en":"scheme","fr":"plan, projet, système","ch":"Ch.1 – Mots essentiels", "tip":"Un 'schéma' ou une machination."},
  {"id":58,"en":"set up","fr":"établir, créer, constituer","ch":"Ch.1 – Mots essentiels", "tip":"Pense au 'setup' d'un ordinateur (installation)."},
  {"id":59,"en":"settle","fr":"installer, régler à l'amiable / régler / rembourser","ch":"Ch.1 – Mots essentiels", "tip":"On 's'installe' sur un accord pour éviter le procès."},
  {"id":60,"en":"standard","fr":"norme, critère / niveau","ch":"Ch.1 – Mots essentiels", "tip":"Transparent."},
  {"id":61,"en":"status","fr":"situation","ch":"Ch.1 – Mots essentiels", "tip":"Ton statut = ta situation."},
  {"id":62,"en":"steady","fr":"régulier, stable","ch":"Ch.1 – Mots essentiels", "tip":"'Ready, steady, go !' (À vos marques, prêts...). Stable avant de partir."},
  {"id":63,"en":"subcontracting","fr":"sous-traitance","ch":"Ch.1 – Mots essentiels", "tip":"'Sub' (sous) + contrat = sous-contrat/traitance."},
  {"id":64,"en":"subsidy","fr":"subvention","ch":"Ch.1 – Mots essentiels", "tip":"Transparent (subside)."},
  {"id":65,"en":"supplier","fr":"fournisseur","ch":"Ch.1 – Mots essentiels", "tip":"Celui qui apporte les 'supplies' (fournitures)."},
  {"id":66,"en":"template","fr":"modèle, document-type","ch":"Ch.1 – Mots essentiels", "tip":"Pense aux templates Word ou PowerPoint."},
  {"id":67,"en":"term","fr":"durée / mandat / condition","ch":"Ch.1 – Mots essentiels", "tip":"Les 'termes' du contrat, ou le terme (fin) d'une durée."},
  {"id":68,"en":"threshold","fr":"seuil","ch":"Ch.1 – Mots essentiels", "tip":"Le bout de bois (hold) qu'on battait (thresh) à la porte : le seuil."},
  {"id":69,"en":"utility","fr":"service public (eau, électricité) / utilité","ch":"Ch.1 – Mots essentiels", "tip":"Ce qui est d'utilité publique (gaz, eau)."},
  {"id":70,"en":"voucher","fr":"bon d'échange, justificatif","ch":"Ch.1 – Mots essentiels", "tip":"Un bon que l'on donne pour 'vouch' (garantir) un achat."},
  {"id":71,"en":"wage earner","fr":"salarié (statut)","ch":"Ch.1 – Mots essentiels", "tip":"Celui qui gagne (earn) le salaire (wage)."},
  {"id":72,"en":"whole","fr":"entier","ch":"Ch.1 – Mots essentiels", "tip":"Le tout (whole) n'a pas de trou (hole)."},
  {"id":73,"en":"witness","fr":"témoin","ch":"Ch.1 – Mots essentiels", "tip":"On le demande à la barre (with) pour témoigner."},
  // ICI JE LAISSE LE RESTE DE TON TABLEAU POUR QUE LE CODE FONCTIONNE
  {"id":74,"en":"action","fr":"action en justice, procès","ch":"Ch.2 – Sources du droit", "tip": "Transparent. Pense à 'intenter une action'."},
  {"id":75,"en":"ADR","fr":"MARC","ch":"Ch.2 – Sources du droit", "tip": "Alternative Dispute Resolution = Modes Alternatifs de Règlement des Conflits."},
  {"id":76,"en":"affidavit","fr":"attestation (sur l'honneur)","ch":"Ch.2 – Sources du droit", "tip": "On 'affirme' (affidavit) solennellement un fait sous serment."},
  {"id":77,"en":"arm's length (ALP)","fr":"conclu sans favoritisme","ch":"Ch.2 – Sources du droit", "tip": "On garde l'autre 'à longueur de bras' (arm's length) = pas de traitement de faveur."},
  {"id":78,"en":"barrister (UK)","fr":"avocat","ch":"Ch.2 – Sources du droit", "tip": "Celui qui plaide à la 'bar' (la barre/le barreau) au Royaume-Uni."},
  {"id":79,"en":"business law","fr":"droit des affaires","ch":"Ch.2 – Sources du droit", "tip": "Le droit (law) du business."},
  {"id":80,"en":"business lawyer","fr":"avocat d'affaires","ch":"Ch.2 – Sources du droit", "tip": "Lawyer (homme de loi) spécialisé en business."},
  {"id":81,"en":"business legal adviser","fr":"juriste conseiller d'E","ch":"Ch.2 – Sources du droit", "tip": "Adviser = celui qui donne des avis (advise) juridiques en entreprise."},
  {"id":82,"en":"case brief","fr":"fiche d'arrêt","ch":"Ch.2 – Sources du droit", "tip": "Un résumé (brief) du cas (case)."},
  {"id":83,"en":"case law","fr":"jurisprudence","ch":"Ch.2 – Sources du droit", "tip": "Le droit (law) créé par les cas (cases) = la jurisprudence."},
  {"id":84,"en":"clerk (UK)","fr":"faire un stage en cabinet","ch":"Ch.2 – Sources du droit", "tip": "Faux-ami : un clerc n'est pas forcément un notaire en anglais, c'est souvent un assistant/stagiaire."},
  {"id":85,"en":"clerkship (UK)","fr":"stage en cabinet","ch":"Ch.2 – Sources du droit", "tip": "Le suffixe '-ship' indique l'état ou la période (comme internship)."},
  {"id":86,"en":"common law","fr":"droit coutumier","ch":"Ch.2 – Sources du droit", "tip": "La loi 'commune', basée sur la coutume et la jurisprudence."},
  {"id":87,"en":"infringement","fr":"atteinte, infraction, violation","ch":"Ch.2 – Sources du droit", "tip": "Pense à 'enfreindre' (infringe) un brevet ou un droit."},
  {"id":88,"en":"in-house counsel","fr":"juriste d'entreprise","ch":"Ch.2 – Sources du droit", "tip": "Le conseiller (counsel) qui travaille 'dans la maison' (in-house = l'entreprise)."},
  {"id":89,"en":"IP","fr":"propriété intellectuelle","ch":"Ch.2 – Sources du droit", "tip": "Intellectual Property. Ultra courant en droit des affaires."},
  {"id":90,"en":"legal department","fr":"service juridique","ch":"Ch.2 – Sources du droit", "tip": "Le département (service) légal."},
  {"id":91,"en":"paralegal","fr":"assistant juridique","ch":"Ch.2 – Sources du droit", "tip": "Travaille 'en parallèle' du système légal (auxiliaire)."},
  {"id":92,"en":"practice area","fr":"domaine de compétence","ch":"Ch.2 – Sources du droit", "tip": "La zone (area) de pratique d'un avocat."},
  {"id":93,"en":"solicitor (UK)","fr":"avocat","ch":"Ch.2 – Sources du droit", "tip": "Avocat anglais qui conseille et rédige (sollicite), mais plaide peu (contrairement au barrister)."},
  {"id":94,"en":"statute","fr":"loi","ch":"Ch.2 – Sources du droit", "tip": "Faux-ami MAJEUR ! Un 'statute' est une loi votée par le Parlement, pas un statut de société."},
  {"id":95,"en":"writ","fr":"acte judiciaire","ch":"Ch.2 – Sources du droit", "tip": "Ancien participe passé de 'write' : un document écrit par la cour."},
  {"id":96,"en":"charge","fr":"inculpation, inculper, chef d'accusation","ch":"Ch.3 – Business torts & crimes", "tip": "On retient une 'charge' contre un suspect."},
  {"id":97,"en":"compensation","fr":"dédommagement, réparation","ch":"Ch.3 – Business torts & crimes", "tip": "On 'compense' une perte financière."},
  {"id":98,"en":"conspiracy","fr":"complot, association de malfaiteurs","ch":"Ch.3 – Business torts & crimes", "tip": "Conspiration criminelle."},
  {"id":99,"en":"convict","fr":"reconnaître coupable de, détenu","ch":"Ch.3 – Business torts & crimes", "tip": "Une 'conviction' en anglais judiciaire = une condamnation."},
  {"id":100,"en":"culprit","fr":"coupable (n)","ch":"Ch.3 – Business torts & crimes", "tip": "Pense à la 'coulpe' (mea culpa) = la faute."},
  {"id":101,"en":"damage","fr":"dommages, dégâts","ch":"Ch.3 – Business torts & crimes", "tip": "Au singulier : le préjudice matériel ou moral (le dégât)."},
  {"id":102,"en":"damages","fr":"dommages-intérêts","ch":"Ch.3 – Business torts & crimes", "tip": "Au pluriel (TRÈS IMPORTANT) : la compensation financière (dommages-intérêts)."},
  {"id":103,"en":"defendant","fr":"défendeur","ch":"Ch.3 – Business torts & crimes", "tip": "Celui qui se 'défend' contre une accusation ou une plainte."},
  {"id":104,"en":"duty of care","fr":"devoir de prudence","ch":"Ch.3 – Business torts & crimes", "tip": "Le devoir (duty) de faire attention (care) à autrui."},
  {"id":105,"en":"embezzlement","fr":"détournement de fonds","ch":"Ch.3 – Business torts & crimes", "tip": "Mot complexe : pense à l'expression 'embrouille financière'."},
  {"id":106,"en":"enforce","fr":"appliquer, faire respecter","ch":"Ch.3 – Business torts & crimes", "tip": "Mettre 'en force' (faire respecter une loi ou un contrat)."},
  {"id":107,"en":"enforceable","fr":"exécutoire","ch":"Ch.3 – Business torts & crimes", "tip": "Qu'on peut faire respecter par la force publique."},
  {"id":108,"en":"forgery","fr":"contrefaçon, falsification","ch":"Ch.3 – Business torts & crimes", "tip": "Forger de faux documents ou de faux billets."},
  {"id":109,"en":"fraud","fr":"dol, fraude, escroc","ch":"Ch.3 – Business torts & crimes", "tip": "Transparent avec le français 'fraude'."},
  {"id":110,"en":"guilty","fr":"coupable (adj) / mal","ch":"Ch.3 – Business torts & crimes", "tip": "Avoir un sentiment de 'guilt' = culpabilité."},
  {"id":111,"en":"harm","fr":"endommager, nuire à","ch":"Ch.3 – Business torts & crimes", "tip": "Pense à 'harmful' (nuisible)."},
  {"id":112,"en":"injury","fr":"blessure, préjudice","ch":"Ch.3 – Business torts & crimes", "tip": "Pas juste une blessure physique, aussi un préjudice (legal injury)."},
  {"id":113,"en":"jail","fr":"prison, emprisonner","ch":"Ch.3 – Business torts & crimes", "tip": "Pense au terme 'jailbreak' (évasion de prison)."},
  {"id":114,"en":"malpractice","fr":"faute professionnelle","ch":"Ch.3 – Business torts & crimes", "tip": "Une 'mauvaise pratique' (souvent pour les avocats ou médecins)."},
  {"id":115,"en":"misleading","fr":"mensonger, trompeur","ch":"Ch.3 – Business torts & crimes", "tip": "Qui mène ('lead') sur la mauvaise ('mis') voie."},
  {"id":116,"en":"negligence","fr":"négligence","ch":"Ch.3 – Business torts & crimes", "tip": "Transparent."},
  {"id":117,"en":"plaintiff","fr":"demandeur","ch":"Ch.3 – Business torts & crimes", "tip": "Celui qui se 'plaint' au tribunal = le demandeur au civil."},
  {"id":118,"en":"proceedings","fr":"procédure","ch":"Ch.3 – Business torts & crimes", "tip": "Ce qui 'procède' devant la cour (legal proceedings)."},
  {"id":119,"en":"release","fr":"libérer","ch":"Ch.3 – Business torts & crimes", "tip": "Relâcher un prisonnier, ou libérer d'une obligation (release of liability)."},
  {"id":120,"en":"sentence","fr":"condamner, peine","ch":"Ch.3 – Business torts & crimes", "tip": "La 'sentence' prononcée par le juge (au pénal)."},
  {"id":121,"en":"settlement","fr":"arrangement à l'amiable","ch":"Ch.3 – Business torts & crimes", "tip": "On 's'installe' (settle) sur un accord financier hors tribunal."},
  {"id":122,"en":"stand trial","fr":"être jugé","ch":"Ch.3 – Business torts & crimes", "tip": "Se tenir (stand) devant le procès (trial)."},
  {"id":123,"en":"subpoena","fr":"citation en justice","ch":"Ch.3 – Business torts & crimes", "tip": "Du latin 'sous peine' (sub poena) : ordre de venir témoigner sous peine d'amende."},
  {"id":124,"en":"summons","fr":"assignation à comparaître","ch":"Ch.3 – Business torts & crimes", "tip": "Le juge te 'somme' de venir au tribunal."},
  {"id":125,"en":"tort","fr":"acte délictuel ou quasi délictuel","ch":"Ch.3 – Business torts & crimes", "tip": "La base de la RC anglaise : 'law of torts' = droit de la responsabilité civile."},
  {"id":126,"en":"try","fr":"juger (accusé)","ch":"Ch.3 – Business torts & crimes", "tip": "Faux-ami : au tribunal, 'try a case' = juger une affaire (d'où vient 'trial' = procès)."},
  {"id":127,"en":"amend","fr":"modifier","ch":"Ch.4 – Formes de sociétés", "tip": "Amender les statuts = les modifier (les avenants)."},
  {"id":128,"en":"AGM (Annual General Meeting)","fr":"AGA","ch":"Ch.4 – Formes de sociétés", "tip": "Assemblée Générale Annuelle."},
  {"id":129,"en":"articles of association","fr":"statuts","ch":"Ch.4 – Formes de sociétés", "tip": "Les articles qui 'associent' les fondateurs (UK)."},
  {"id":130,"en":"authorised capital","fr":"capital social","ch":"Ch.4 – Formes de sociétés", "tip": "Le plafond maximal de capital 'autorisé' à être émis."},
  {"id":131,"en":"board of directors","fr":"conseil d'administration","ch":"Ch.4 – Formes de sociétés", "tip": "Le conseil ('board' = la table de réunion) des directeurs."},
  {"id":132,"en":"bonus shares","fr":"action gratuites","ch":"Ch.4 – Formes de sociétés", "tip": "Des actions données en 'bonus'."},
  {"id":133,"en":"business entity","fr":"forme de société","ch":"Ch.4 – Formes de sociétés", "tip": "L'entité commerciale (SARL, SA, etc.)."},
  {"id":134,"en":"by-laws","fr":"statuts","ch":"Ch.4 – Formes de sociétés", "tip": "Les lois 'à côté' (internes) de l'entreprise (US)."},
  {"id":135,"en":"carried","fr":"adoptée (résolution)","ch":"Ch.4 – Formes de sociétés", "tip": "La résolution a été 'portée' jusqu'à la victoire."},
  {"id":136,"en":"chair","fr":"président","ch":"Ch.4 – Formes de sociétés", "tip": "La 'chaise' principale = le/la président(e) de l'assemblée."},
  {"id":137,"en":"charter","fr":"statuts","ch":"Ch.4 – Formes de sociétés", "tip": "La charte fondatrice de la société."},
  {"id":138,"en":"CAO (Chief Accounting Officer)","fr":"chef comptable","ch":"Ch.4 – Formes de sociétés", "tip": "A pour 'Accounting' (Comptabilité)."},
  {"id":139,"en":"CEO (Chief Executive Officer)","fr":"DG","ch":"Ch.4 – Formes de sociétés", "tip": "E pour 'Executive' (Directeur Général)."},
  {"id":140,"en":"CFO (Chief Financial Officer)","fr":"DAF","ch":"Ch.4 – Formes de sociétés", "tip": "F pour 'Financial' (Directeur Financier)."},
  {"id":141,"en":"chairman and CEO","fr":"PDG (Fr)","ch":"Ch.4 – Formes de sociétés", "tip": "Cumul du Président (Chairman) et du Directeur Général (CEO)."},
  {"id":142,"en":"convene","fr":"convoquer","ch":"Ch.4 – Formes de sociétés", "tip": "Convenir de se réunir = convoquer une assemblée."},
  {"id":143,"en":"convening notice","fr":"convocation","ch":"Ch.4 – Formes de sociétés", "tip": "La notification (notice) pour la convocation (convening)."},
  {"id":144,"en":"corporate tax","fr":"impôt sur les sociétés","ch":"Ch.4 – Formes de sociétés", "tip": "La taxe des entreprises (corporations). IS français."},
  {"id":145,"en":"corporate veil","fr":"écran","ch":"Ch.4 – Formes de sociétés", "tip": "Le 'voile' de la personnalité morale qui protège le patrimoine des associés ('piercing the veil' = lever le voile)."},
  {"id":146,"en":"corporation (US)","fr":"société de capitaux","ch":"Ch.4 – Formes de sociétés", "tip": "L'équivalent des SA/SAS aux États-Unis."},
  {"id":147,"en":"corporation (UK)","fr":"société semi-publique","ch":"Ch.4 – Formes de sociétés", "tip": "Attention ! Au UK, 'corporation' vise souvent des entités publiques/municipales."},
  {"id":148,"en":"director","fr":"administrateur","ch":"Ch.4 – Formes de sociétés", "tip": "Siège au Board of Directors (Conseil d'Administration)."},
  {"id":149,"en":"EGM (Extraordinary General Meeting)","fr":"AGE","ch":"Ch.4 – Formes de sociétés", "tip": "Assemblée Générale Extraordinaire."},
  {"id":150,"en":"file a document","fr":"déposer, enregistrer officiellement","ch":"Ch.4 – Formes de sociétés", "tip": "Mettre dans le dossier (file) du registre du commerce."},
  {"id":151,"en":"float","fr":"introduire en bourse","ch":"Ch.4 – Formes de sociétés", "tip": "Faire 'flotter' la société sur les marchés financiers."},
  {"id":152,"en":"general partner","fr":"commandité","ch":"Ch.4 – Formes de sociétés", "tip": "L'associé (partner) qui a la responsabilité générale et illimitée."},
  {"id":153,"en":"general partnership","fr":"SNC","ch":"Ch.4 – Formes de sociétés", "tip": "Société en Nom Collectif, tous les partners sont solidaires."},
  {"id":154,"en":"go private","fr":"se retirer de la cote","ch":"Ch.4 – Formes de sociétés", "tip": "Redevenir une société 'privée' (non cotée en bourse)."},
  {"id":155,"en":"go public","fr":"s'introduire en bourse","ch":"Ch.4 – Formes de sociétés", "tip": "Ouvrir son capital au 'public' (IPO)."},
  {"id":156,"en":"goodwill","fr":"plus-value latente, écart d'acquisition","ch":"Ch.4 – Formes de sociétés", "tip": "La 'bonne volonté' (réputation, clientèle) = survaleur en comptabilité."},
  {"id":157,"en":"headquarters","fr":"siège social","ch":"Ch.4 – Formes de sociétés", "tip": "Les quartiers (quarters) de la tête (head)."},
  {"id":158,"en":"HO=Head Office","fr":"siège social","ch":"Ch.4 – Formes de sociétés", "tip": "Bureau (office) principal (head)."},
  {"id":159,"en":"incorporate","fr":"créer (sté)","ch":"Ch.4 – Formes de sociétés", "tip": "Donner un 'corps' (personnalité morale) à l'entreprise."},
  {"id":160,"en":"incorporation","fr":"constitution","ch":"Ch.4 – Formes de sociétés", "tip": "Acte de donner la personnalité morale."},
  {"id":161,"en":"IPO=Initial Public Offering","fr":"introduction en bourse","ch":"Ch.4 – Formes de sociétés", "tip": "Offre (Offering) Publique Initiale."},
  {"id":162,"en":"item on the agenda","fr":"point à l'ordre du jour","ch":"Ch.4 – Formes de sociétés", "tip": "Un point (item) sur l'agenda de l'assemblée."},
  {"id":163,"en":"joint-stock company","fr":"société de capitaux","ch":"Ch.4 – Formes de sociétés", "tip": "Société avec des actions (stock) conjointes (joint)."},
  {"id":164,"en":"legal person","fr":"personne morale","ch":"Ch.4 – Formes de sociétés", "tip": "Une 'personne' aux yeux de la loi (distincte des personnes physiques)."},
  {"id":165,"en":"liability","fr":"responsabilité","ch":"Ch.4 – Formes de sociétés", "tip": "La responsabilité légale et financière (les dettes, le passif)."},
  {"id":166,"en":"limited company","fr":"société à responsabilité limitée","ch":"Ch.4 – Formes de sociétés", "tip": "La responsabilité des associés est 'limitée' à leurs apports."},
  {"id":167,"en":"LLC","fr":"SARL US","ch":"Ch.4 – Formes de sociétés", "tip": "Limited Liability Company = SARL aux USA."},
  {"id":168,"en":"Ltd (private limited company)","fr":"SARL UK","ch":"Ch.4 – Formes de sociétés", "tip": "SARL au Royaume-Uni (non cotée en bourse)."},
  {"id":169,"en":"Managing Director (UK)","fr":"directeur général","ch":"Ch.4 – Formes de sociétés", "tip": "Équivalent britannique du CEO."},
  {"id":170,"en":"memorandum of association","fr":"statuts","ch":"Ch.4 – Formes de sociétés", "tip": "Acte constitutif (UK) détaillant l'objet et le capital de la société."},
  {"id":171,"en":"minutes of a meeting","fr":"PV d'une assemblée","ch":"Ch.4 – Formes de sociétés", "tip": "Le compte rendu écrit ('minutes') de ce qui s'est dit."},
  {"id":172,"en":"motion","fr":"motion","ch":"Ch.4 – Formes de sociétés", "tip": "Proposition soumise au vote (une résolution en projet)."},
  {"id":173,"en":"nominal capital = authorized capital","fr":"capital social","ch":"Ch.4 – Formes de sociétés", "tip": "Le capital nominal (montant maximum)."},
  {"id":174,"en":"officer","fr":"dirigeant","ch":"Ch.4 – Formes de sociétés", "tip": "Un cadre supérieur (CEO, CFO...) nommé par le Board."},
  {"id":175,"en":"organisation chart","fr":"organigramme","ch":"Ch.4 – Formes de sociétés", "tip": "Le graphique (chart) de l'organisation de l'entreprise."},
  {"id":176,"en":"paid up","fr":"libéré","ch":"Ch.4 – Formes de sociétés", "tip": "Capital entièrement 'payé' par les actionnaires."},
  {"id":177,"en":"parent company","fr":"société mère","ch":"Ch.4 – Formes de sociétés", "tip": "La société 'parent' (qui contrôle les filiales)."},
  {"id":178,"en":"partnership","fr":"société de personnes","ch":"Ch.4 – Formes de sociétés", "tip": "Société fondée sur l'intuitu personae entre partenaires."},
  {"id":179,"en":"pass a resolution","fr":"voter une résolution","ch":"Ch.4 – Formes de sociétés", "tip": "Faire 'passer' le vote avec succès."},
  {"id":180,"en":"plc (public limited company)","fr":"SA UK","ch":"Ch.4 – Formes de sociétés", "tip": "Société Anonyme britannique, autorisée à faire appel au 'public' pour son capital."},
  {"id":181,"en":"pre-emption rights","fr":"droits de préemption","ch":"Ch.4 – Formes de sociétés", "tip": "Le droit d'acheter en priorité avant les tiers."},
  {"id":182,"en":"quorum","fr":"quorum","ch":"Ch.4 – Formes de sociétés", "tip": "Nombre minimum de présents pour que le vote soit valide (latin)."},
  {"id":183,"en":"remove from office","fr":"relever de ses fonctions","ch":"Ch.4 – Formes de sociétés", "tip": "Retirer (remove) quelqu'un de son poste (office) = révoquer."},
  {"id":184,"en":"share capital=issued capital","fr":"capital social","ch":"Ch.4 – Formes de sociétés", "tip": "Le capital divisé en actions (shares)."},
  {"id":185,"en":"share premium","fr":"prime d'émission","ch":"Ch.4 – Formes de sociétés", "tip": "L'excédent (premium) payé par dessus la valeur nominale de l'action."},
  {"id":186,"en":"shield","fr":"écran","ch":"Ch.4 – Formes de sociétés", "tip": "Le bouclier (shield) qui protège les actionnaires des dettes de la sté."},
  {"id":187,"en":"sleeping partner","fr":"commanditaire","ch":"Ch.4 – Formes de sociétés", "tip": "L'associé qui 'dort' : il amène le capital mais ne gère pas."},
  {"id":188,"en":"sole","fr":"unique","ch":"Ch.4 – Formes de sociétés", "tip": "Pense à 'solitaire' (ex: sole proprietorship = entreprise individuelle)."},
  {"id":189,"en":"stake","fr":"participation, part","ch":"Ch.4 – Formes de sociétés", "tip": "Ta mise dans le jeu (avoir un 'stake' dans une entreprise)."},
  {"id":190,"en":"subsidiary","fr":"filiale","ch":"Ch.4 – Formes de sociétés", "tip": "Faux-ami classique : ce n'est pas une subvention, c'est une filiale !"},
  {"id":191,"en":"supervisory board","fr":"conseil de surveillance","ch":"Ch.4 – Formes de sociétés", "tip": "Le conseil qui 'supervise' le directoire."},
  {"id":192,"en":"term of office","fr":"mandat","ch":"Ch.4 – Formes de sociétés", "tip": "La durée (term) d'un poste (office)."},
  {"id":193,"en":"ultra vires","fr":"au-delà des pouvoirs conférés","ch":"Ch.4 – Formes de sociétés", "tip": "Terme latin utilisé quand un dirigeant dépasse ses pouvoirs statuaires."},
  {"id":194,"en":"undertaking","fr":"entreprise","ch":"Ch.4 – Formes de sociétés", "tip": "Le fait d'entreprendre ('take under') un projet ou un engagement."},
  {"id":195,"en":"venture","fr":"entreprise","ch":"Ch.4 – Formes de sociétés", "tip": "Un projet risqué (pense à 'aventure' ou Joint-Venture)."},
  {"id":196,"en":"venue","fr":"lieu","ch":"Ch.4 – Formes de sociétés", "tip": "Le lieu où l'on 'vient' pour se réunir (assemblée)."},{"id":197,"en":"bid","fr":"offre, soumission, offrir","ch":"Ch.5 – Restructuring", "tip":"Pense à eBay : faire une offre (bidding) pour remporter l'enchère."},
  {"id":198,"en":"bidder","fr":"offrant, initiateur (OPA)","ch":"Ch.5 – Restructuring", "tip":"Celui qui fait le 'bid'."},
  {"id":199,"en":"bullet payment","fr":"paiement in fine","ch":"Ch.5 – Restructuring", "tip":"Comme une balle (bullet) de pistolet : on tire tout d'un seul coup à la fin."},
  {"id":200,"en":"carve out","fr":"scission partielle","ch":"Ch.5 – Restructuring", "tip":"'Carve' = sculpter/découper (ex: découper la dinde). On détache un morceau de la boîte."},
  {"id":201,"en":"divestment","fr":"cession d'actifs","ch":"Ch.5 – Restructuring", "tip":"L'inverse exact de l'in-vestissement (di-vest)."},
  {"id":202,"en":"downsizing","fr":"réduction d'effectifs","ch":"Ch.5 – Restructuring", "tip":"Réduire la taille (size) vers le bas (down)."},
  {"id":203,"en":"drag along","fr":"obligation de sortie proportionnelle","ch":"Ch.5 – Restructuring", "tip":"'Drag' = traîner. Le majoritaire 'traîne' le minoritaire avec lui dans la vente."},
  {"id":204,"en":"due diligence","fr":"audit (avant fusion, etc.)","ch":"Ch.5 – Restructuring", "tip":"Faire les vérifications 'dues' avec 'diligence'."},
  {"id":205,"en":"equity capital","fr":"capitaux propres","ch":"Ch.5 – Restructuring", "tip":"Faux-ami : 'equity' en finance = les capitaux propres, pas juste l'équité."},
  {"id":206,"en":"executive summary","fr":"résumé opérationnel M&A","ch":"Ch.5 – Restructuring", "tip":"Le résumé pour les 'executives' (dirigeants pressés)."},
  {"id":207,"en":"fairness opinion","fr":"fairness opinion","ch":"Ch.5 – Restructuring", "tip":"Opinion sur l'équité (fairness) du prix proposé."},
  {"id":208,"en":"globalisation","fr":"mondialisation","ch":"Ch.5 – Restructuring", "tip":"Global = mondial."},
  {"id":209,"en":"IOI","fr":"indication d'intérêt M&A","ch":"Ch.5 – Restructuring", "tip":"Indication Of Interest (acronyme)."},
  {"id":210,"en":"LBO","fr":"achat avec effet de levier","ch":"Ch.5 – Restructuring", "tip":"Leveraged Buy-Out. 'Leverage' = le levier (souvent la dette)."},
  {"id":211,"en":"LOI (= term sheet= MOU)","fr":"lettre d'intention M&A, LBO","ch":"Ch.5 – Restructuring", "tip":"Letter Of Intent (lettre d'intention)."},
  {"id":212,"en":"merger","fr":"fusion","ch":"Ch.5 – Restructuring", "tip":"Pense à M&A : Mergers and Acquisitions. Deux boîtes qui 'émergent' ensemble."},
  {"id":213,"en":"NDA (non disclosure agreement)","fr":"accord de confidentialité M&A","ch":"Ch.5 – Restructuring", "tip":"Non-Disclosure : interdiction de divulguer (très courant en stage)."},
  {"id":214,"en":"OM","fr":"résumé de l'offre M&A","ch":"Ch.5 – Restructuring", "tip":"Offering Memorandum."},
  {"id":215,"en":"poison pill","fr":"pilule empoisonnée","ch":"Ch.5 – Restructuring", "tip":"Tactique toxique pour décourager un rachat hostile."},
  {"id":216,"en":"raise capital","fr":"lever des capitaux","ch":"Ch.5 – Restructuring", "tip":"'Raise' (lever) l'argent comme on lève la main."},
  {"id":217,"en":"relocate","fr":"délocaliser","ch":"Ch.5 – Restructuring", "tip":"Changer de 'location' (lieu)."},
  {"id":218,"en":"shotgun = buy or sell = Texas Shootout Clause","fr":"cl shotgun, coercitive (achat-vente forcée) SPA","ch":"Ch.5 – Restructuring", "tip":"Comme un duel au fusil à pompe (shotgun) : tu achètes mes parts ou je t'achète les tiennes."},
  {"id":219,"en":"SPA (stock purchase agreement)","fr":"accord de cession d'actions","ch":"Ch.5 – Restructuring", "tip":"Stock (actions) Purchase (achat) Agreement (accord)."},
  {"id":220,"en":"spin-off","fr":"scission","ch":"Ch.5 – Restructuring", "tip":"Comme à la télé (un spin-off de série) : créer une entreprise dérivée."},
  {"id":221,"en":"tag along","fr":"droit de sortie proportionnelle","ch":"Ch.5 – Restructuring", "tip":"'Tag along' = suivre le mouvement. Le minoritaire a le droit de 'suivre' le majoritaire dans la vente."},
  {"id":222,"en":"takeover","fr":"acquisition","ch":"Ch.5 – Restructuring", "tip":"Prendre (take) le contrôle (over)."},
  {"id":223,"en":"takeover bid","fr":"OPA","ch":"Ch.5 – Restructuring", "tip":"L'offre (bid) pour prendre le contrôle (takeover)."},
  {"id":224,"en":"tender offer","fr":"OPA","ch":"Ch.5 – Restructuring", "tip":"Faux-ami : 'tender' veut dire 'présenter formellement' une offre."},
  {"id":225,"en":"venture capital","fr":"capital risque","ch":"Ch.5 – Restructuring", "tip":"Investir dans une a-venture (venture) risquée = les startups."},
  {"id":226,"en":"administrative receiver","fr":"administrateur","ch":"Ch.6 – Insolvabilité", "tip":"Celui qui 'reçoit' l'administration de l'entreprise en faillite."},
  {"id":227,"en":"ailing","fr":"en difficulté","ch":"Ch.6 – Insolvabilité", "tip":"'Ail' = souffrir (maladie). Une entreprise malade, mal en point."},
  {"id":228,"en":"bankruptcy","fr":"faillite","ch":"Ch.6 – Insolvabilité", "tip":"Banque + rupture (rupt) = la banque est cassée."},
  {"id":229,"en":"bankruptcy administrator","fr":"administrateur","ch":"Ch.6 – Insolvabilité", "tip":"Transparent (administrateur de faillite)."},
  {"id":230,"en":"Chapter 7","fr":"liquidation (US)","ch":"Ch.6 – Insolvabilité", "tip":"US : Chapitre 7 = c'est la fin, on liquide tout."},
  {"id":231,"en":"Chapter 11","fr":"faillite stratégique, procédure de sauvegarde (US)","ch":"Ch.6 – Insolvabilité", "tip":"US : Pense au '911' (urgences) -> Le Chap. 11 est là pour sauver l'entreprise (restructuration)."},
  {"id":232,"en":"collateral","fr":"nantissement, garantie","ch":"Ch.6 – Insolvabilité", "tip":"Une garantie apportée 'en collatéral' (à côté) du prêt."},
  {"id":233,"en":"collection","fr":"perception, recouvrement","ch":"Ch.6 – Insolvabilité", "tip":"Aller 'collecter' les dettes impayées."},
  {"id":234,"en":"creditors' committee","fr":"comité de créanciers","ch":"Ch.6 – Insolvabilité", "tip":"Transparent."},
  {"id":235,"en":"DIP (Debtor in possession)","fr":"débiteur non dessaisi dans le Chap. 11","ch":"Ch.6 – Insolvabilité", "tip":"Debtor In Possession : le dirigeant garde les clés pendant la procédure."},
  {"id":236,"en":"file a petition in bankruptcy","fr":"déposer le bilan / acquitter","ch":"Ch.6 – Insolvabilité", "tip":"'File' = déposer un dossier au tribunal."},
  {"id":237,"en":"discharge","fr":"réhabiliter","ch":"Ch.6 – Insolvabilité", "tip":"'Décharger' le failli de ses dettes passées."},
  {"id":238,"en":"file for bankruptcy","fr":"déposer le bilan","ch":"Ch.6 – Insolvabilité", "tip":"Remplir (file) les papiers de faillite."},
  {"id":239,"en":"floating charge","fr":"charge ou nantissement flottant sur des biens non spécifiés","ch":"Ch.6 – Insolvabilité", "tip":"Une garantie qui 'flotte' sur des stocks (car les stocks bougent)."},
  {"id":240,"en":"garnishment","fr":"saisie-arrêt","ch":"Ch.6 – Insolvabilité", "tip":"Le créancier se 'garnit' en allant saisir ton salaire directement à la source."},
  {"id":241,"en":"gross","fr":"brut","ch":"Ch.6 – Insolvabilité", "tip":"Pense au mot 'gros' : le montant total avant qu'on enlève les taxes."},
  {"id":242,"en":"insolvency","fr":"insolvabilité","ch":"Ch.6 – Insolvabilité", "tip":"In-solvable : qui ne peut plus résoudre ses dettes."},
  {"id":243,"en":"mismanagement","fr":"mauvaise gestion","ch":"Ch.6 – Insolvabilité", "tip":"'Mis' (mauvais) + 'management' (gestion)."},
  {"id":244,"en":"pledge","fr":"gage, gager","ch":"Ch.6 – Insolvabilité", "tip":"Un engagement fort, on 'gage' un bien matériel."},
  {"id":245,"en":"receiver","fr":"administrateur judiciaire","ch":"Ch.6 – Insolvabilité", "tip":"Il 'reçoit' les pleins pouvoirs du juge pour gérer la crise."},
  {"id":246,"en":"receivership","fr":"redressement judiciaire","ch":"Ch.6 – Insolvabilité", "tip":"L'état d'être placé sous l'autorité d'un 'receiver'."},
  {"id":247,"en":"secured creditor","fr":"créancier privilégié","ch":"Ch.6 – Insolvabilité", "tip":"Il est 'sécurisé' car il a pris une garantie/hypothèque."},
  {"id":248,"en":"security","fr":"caution, garantie","ch":"Ch.6 – Insolvabilité", "tip":"Ce qui donne de la 'sécurité' au créancier."},
  {"id":249,"en":"solvency","fr":"solvabilité","ch":"Ch.6 – Insolvabilité", "tip":"Capacité à payer (inverse de l'insolvabilité)."},
  {"id":250,"en":"suspension of payments","fr":"suspension des poursuites individuelles","ch":"Ch.6 – Insolvabilité", "tip":"On gèle/suspend les paiements pour souffler."},
  {"id":251,"en":"unsecured creditor","fr":"créancier chirographaire","ch":"Ch.6 – Insolvabilité", "tip":"Créancier 'non sécurisé' (sans garantie, il passe en dernier)."},
  {"id":252,"en":"wind up","fr":"liquider","ch":"Ch.6 – Insolvabilité", "tip":"Pense à enrouler/remonter (wind) les câbles à la fin d'un spectacle = on ferme boutique."},
  {"id":253,"en":"workout plan","fr":"plan de redressement","ch":"Ch.6 – Insolvabilité", "tip":"Un plan où on va faire des efforts (travailler/workout) pour s'en sortir sans le juge."},
  {"id":254,"en":"abuse of dominant position","fr":"abus de position dominante","ch":"Ch.7 – Droit de la concurrence", "tip":"Transparent !"},
  {"id":255,"en":"allege","fr":"alléguer, prétendre","ch":"Ch.7 – Droit de la concurrence", "tip":"Faire une allégation (prétendre sans preuve validée)."},
  {"id":256,"en":"competition law","fr":"droit de la concurrence","ch":"Ch.7 – Droit de la concurrence", "tip":"La loi de la compétition (la concurrence)."},
  {"id":257,"en":"deceptive","fr":"trompeur","ch":"Ch.7 – Droit de la concurrence", "tip":"Pense à la 'déception' : la pub t'a trompé sur la marchandise."},
  {"id":258,"en":"divestiture","fr":"scission","ch":"Ch.7 – Droit de la concurrence", "tip":"L'autorité t'oblige à 'dés-investir' (vendre) une branche pour éviter un monopole."},
  {"id":259,"en":"monopolisation","fr":"monopolisation","ch":"Ch.7 – Droit de la concurrence", "tip":"Transparent."},
  {"id":260,"en":"monopoly","fr":"monopole","ch":"Ch.7 – Droit de la concurrence", "tip":"Comme le jeu de société."},
  {"id":261,"en":"predatory pricing","fr":"prix prédateur","ch":"Ch.7 – Droit de la concurrence", "tip":"Des prix si bas qu'ils dévorent (prédateur) les concurrents."},
  {"id":262,"en":"restraint of trade","fr":"entrave","ch":"Ch.7 – Droit de la concurrence", "tip":"Restreindre (restraint) le libre commerce (trade)."},
  {"id":263,"en":"tying arrangement (= bundling)","fr":"vente forcée, vente liée","ch":"Ch.7 – Droit de la concurrence", "tip":"'Tie' = nouer/attacher. On t'oblige à acheter A pour avoir B."},
  {"id":264,"en":"unfair competition","fr":"concurrence déloyale","ch":"Ch.7 – Droit de la concurrence", "tip":"Concurrence 'injuste' (unfair)."},
  {"id":265,"en":"violation","fr":"violation, infraction","ch":"Ch.7 – Droit de la concurrence", "tip":"Violoation d'une loi antitrust."},
  {"id":266,"en":"affirmative action","fr":"discrimination positive","ch":"Ch.8 – Droit du travail", "tip":"Terme US : Action 'affirmative' pour aider les minorités."},
  {"id":267,"en":"assignment","fr":"mission","ch":"Ch.8 – Droit du travail", "tip":"Une tâche qu'on t'a 'assignée'."},
  {"id":268,"en":"benefit","fr":"allocation, avantage","ch":"Ch.8 – Droit du travail", "tip":"Les 'bénéfices' d'un poste (mutuelle, tickets resto)."},
  {"id":269,"en":"bias","fr":"distorsion, partialité","ch":"Ch.8 – Droit du travail", "tip":"Avoir un biais (ex: biais cognitif) = ne pas être objectif."},
  {"id":270,"en":"bonus","fr":"prime","ch":"Ch.8 – Droit du travail", "tip":"Transparent (le bonus de fin d'année)."},
  {"id":271,"en":"career change","fr":"reconversion","ch":"Ch.8 – Droit du travail", "tip":"Changer de carrière."},
  {"id":272,"en":"compensation","fr":"rémunération","ch":"Ch.8 – Droit du travail", "tip":"Faux-ami majeur en RH ! Ce n'est pas qu'un dédommagement, c'est le package global de rémunération (salaire + bonus)."},
  {"id":273,"en":"co-workers","fr":"collègues","ch":"Ch.8 – Droit du travail", "tip":"Ceux qui travaillent (workers) avec toi (co)."},
  {"id":274,"en":"collective bargaining agreement","fr":"convention collective","ch":"Ch.8 – Droit du travail", "tip":"Accord issu d'une 'négociation' (bargain) collective par les syndicats."},
  {"id":275,"en":"disabled","fr":"handicapé","ch":"Ch.8 – Droit du travail", "tip":"Qui n'est pas 'habile' ou 'capable' (able) de faire = dis-abled."},
  {"id":276,"en":"discriminatory","fr":"discriminatoire","ch":"Ch.8 – Droit du travail", "tip":"Transparent."},
  {"id":277,"en":"dismissal","fr":"licenciement","ch":"Ch.8 – Droit du travail", "tip":"'Dismiss' = renvoyer (pense aux profs qui disent 'class dismissed' à la fin de l'heure)."},
  {"id":278,"en":"dispute","fr":"conflit","ch":"Ch.8 – Droit du travail", "tip":"Une dispute (conflit) avec l'employeur."},
  {"id":279,"en":"early retirement","fr":"préretraite","ch":"Ch.8 – Droit du travail", "tip":"La retraite (retirement) prise 'tôt' (early)."},
  {"id":280,"en":"expense account","fr":"remboursement de frais","ch":"Ch.8 – Droit du travail", "tip":"Le compte (account) pour tes dépenses pro (expenses)."},
  {"id":281,"en":"family allowances","fr":"allocations familiales","ch":"Ch.8 – Droit du travail", "tip":"Ce que l'État t'alloue (allow)."},
  {"id":282,"en":"fixed-end contract","fr":"CDD","ch":"Ch.8 – Droit du travail", "tip":"Contrat avec une fin (end) fixée (fixed)."},
  {"id":283,"en":"fringe benefits","fr":"avantages en nature","ch":"Ch.8 – Droit du travail", "tip":"Les avantages sur la 'frange' (la bordure) du salaire fixe (ex: voiture de fonction)."},
  {"id":284,"en":"genuine","fr":"authentique, véritable, sincère","ch":"Ch.8 – Droit du travail", "tip":"Pense au cuir 'genuine leather' (cuir véritable). Souvent utilisé pour 'cause réelle et sérieuse'."},
  {"id":285,"en":"harassment","fr":"harcèlement","ch":"Ch.8 – Droit du travail", "tip":"Transparent (harass = harceler)."},
  {"id":286,"en":"head","fr":"chef","ch":"Ch.8 – Droit du travail", "tip":"La tête de l'équipe."},
  {"id":287,"en":"hierarchy","fr":"hiérarchie","ch":"Ch.8 – Droit du travail", "tip":"Transparent."},
  {"id":288,"en":"hire","fr":"recruter","ch":"Ch.8 – Droit du travail", "tip":"Pense aux panneaux US 'We are hiring' (on embauche)."},
  {"id":289,"en":"internship","fr":"stage","ch":"Ch.8 – Droit du travail", "tip":"L'étudiant qui vient en 'interne' dans la boîte."},
  {"id":290,"en":"Labor Code","fr":"Code du Travail","ch":"Ch.8 – Droit du travail", "tip":"Le code du labeur."},
  {"id":291,"en":"leave","fr":"congé","ch":"Ch.8 – Droit du travail", "tip":"Tu as l'autorisation de 'quitter' (leave) le travail (sick leave, maternity leave)."},
  {"id":292,"en":"minimum wage","fr":"SMIC","ch":"Ch.8 – Droit du travail", "tip":"Le salaire (wage) minimum autorisé."},
  {"id":293,"en":"occupational","fr":"professionnel","ch":"Ch.8 – Droit du travail", "tip":"Lié à ton 'occupation' (ton métier). Ex: occupational hazard (risque pro)."},
  {"id":294,"en":"open-end contract","fr":"CDI","ch":"Ch.8 – Droit du travail", "tip":"Contrat avec une fin (end) 'ouverte' (open = sans date limite)."},
  {"id":295,"en":"optional profit-sharing plan","fr":"intéressement","ch":"Ch.8 – Droit du travail", "tip":"Plan de partage des profits (bonus facultatif/optionnel)."},
  {"id":296,"en":"payroll","fr":"personnel, registre du personnel","ch":"Ch.8 – Droit du travail", "tip":"Le 'rouleau' (roll) qui liste tous ceux qu'il faut 'payer' (pay)."},
  {"id":297,"en":"pension scheme","fr":"régime de retraite","ch":"Ch.8 – Droit du travail", "tip":"Le schéma/plan pour ta pension de retraite."},
  {"id":298,"en":"perk","fr":"avantages en nature","ch":"Ch.8 – Droit du travail", "tip":"'Les petits perks' d'une startup : café gratuit, babyfoot..."},
  {"id":299,"en":"pregnancy","fr":"grossesse","ch":"Ch.8 – Droit du travail", "tip":"Être 'prégnante' = être enceinte en vieux français."},
  {"id":300,"en":"professional misconduct","fr":"faute professionnelle","ch":"Ch.8 – Droit du travail", "tip":"Mauvaise (mis) conduite (conduct) au travail."},
  {"id":301,"en":"profit sharing","fr":"participation des salariés","ch":"Ch.8 – Droit du travail", "tip":"Partager les profits légalement."},
  {"id":302,"en":"public holidays","fr":"jours fériés","ch":"Ch.8 – Droit du travail", "tip":"Jours de repos (holidays) pour tout le public."},
  {"id":303,"en":"real and serious grounds","fr":"cause réelle et sérieuse","ch":"Ch.8 – Droit du travail", "tip":"Traduction littérale exacte (nécessaire pour un licenciement)."},
  {"id":304,"en":"reprimand","fr":"blâme","ch":"Ch.8 – Droit du travail", "tip":"Donner une réprimande officielle."},
  {"id":305,"en":"run","fr":"diriger","ch":"Ch.8 – Droit du travail", "tip":"Faire 'courir' la machine = diriger l'entreprise."},
  {"id":306,"en":"senior executive","fr":"cadre supérieur","ch":"Ch.8 – Droit du travail", "tip":"Un exécutif (cadre) très expérimenté (senior)."},
  {"id":307,"en":"seniority","fr":"ancienneté","ch":"Ch.8 – Droit du travail", "tip":"Ton niveau d'ancienneté te rend plus 'senior'."},
  {"id":308,"en":"severance pay","fr":"indemnité de licenciement","ch":"Ch.8 – Droit du travail", "tip":"L'argent payé pour 'séparer' / couper (sever) les liens contractuels."},
  {"id":309,"en":"sick leave","fr":"arrêt maladie","ch":"Ch.8 – Droit du travail", "tip":"Congé (leave) parce qu'on est malade (sick)."},
  {"id":310,"en":"social security contributions","fr":"charges sociales","ch":"Ch.8 – Droit du travail", "tip":"Cotisations pour la sécurité sociale."},
  {"id":311,"en":"staff delegate","fr":"délégué du personnel","ch":"Ch.8 – Droit du travail", "tip":"Délégué du 'staff' (équipe)."},
  {"id":312,"en":"stock option","fr":"stock option","ch":"Ch.8 – Droit du travail", "tip":"Transparent : option d'achat d'actions."},
  {"id":313,"en":"temp","fr":"intérimaire, faire de l'intérim","ch":"Ch.8 – Droit du travail", "tip":"Raccourci pour travailleur 'temporaire'."},
  {"id":314,"en":"transfer","fr":"muter","ch":"Ch.8 – Droit du travail", "tip":"Transférer l'employé vers un autre site."},
  {"id":315,"en":"trial period=trial run","fr":"période d'essai","ch":"Ch.8 – Droit du travail", "tip":"'Trial' veut dire procès, mais ici ça veut dire essai/test."},
  {"id":316,"en":"unfair dismissal","fr":"licenciement abusif","ch":"Ch.8 – Droit du travail", "tip":"Renvoyé (dismissal) d'une manière injuste (unfair)."},
  {"id":317,"en":"union","fr":"syndicat","ch":"Ch.8 – Droit du travail", "tip":"'L'union' fait la force pour défendre les travailleurs (trade union)."},
  {"id":318,"en":"union delegate","fr":"délégué syndical","ch":"Ch.8 – Droit du travail", "tip":"Le délégué de l'union."},
  {"id":319,"en":"union rep","fr":"représentant syndical","ch":"Ch.8 – Droit du travail", "tip":"Rep = abréviation de Representative."},
  {"id":320,"en":"vocational training","fr":"formation professionnelle","ch":"Ch.8 – Droit du travail", "tip":"L'entraînement pour ta 'vocation' (ton futur métier)."},
  {"id":321,"en":"whistle blowing","fr":"dénonciation de pratiques illicites dans l'E","ch":"Ch.8 – Droit du travail", "tip":"Littéralement 'souffler dans le sifflet' (comme l'arbitre qui signale une faute) = lancer l'alerte."},
  {"id":322,"en":"wilful misconduct","fr":"faute lourde","ch":"Ch.8 – Droit du travail", "tip":"Une mauvaise conduite (misconduct) faite avec la 'volonté' de nuire (wilful)."},
  {"id":323,"en":"workforce","fr":"effectif","ch":"Ch.8 – Droit du travail", "tip":"La force (force) de travail (work)."},
  {"id":324,"en":"work placement","fr":"stage","ch":"Ch.8 – Droit du travail", "tip":"Être 'placé' sur un lieu de travail (UK)."},
  {"id":325,"en":"working hours","fr":"temps de travail","ch":"Ch.8 – Droit du travail", "tip":"Les heures travaillées."},
  {"id":326,"en":"workplace","fr":"lieu de travail","ch":"Ch.8 – Droit du travail", "tip":"La place/le lieu où l'on travaille."},{"id":327,"en":"account holder","fr":"titulaire d'un compte","ch":"Ch.9 – Banque & finance", "tip":"Celui qui 'tient' (holds) le compte (account)."},
  {"id":328,"en":"asset management","fr":"gestion d'actifs","ch":"Ch.9 – Banque & finance", "tip":"Management (gestion) des assets (actifs)."},
  {"id":329,"en":"balance","fr":"solde","ch":"Ch.9 – Banque & finance", "tip":"La 'balance' de ce qu'il te reste sur le compte."},
  {"id":330,"en":"bank charges","fr":"agios, frais bancaires","ch":"Ch.9 – Banque & finance", "tip":"Ce que la banque te 'charge' (facture)."},
  {"id":331,"en":"bank transfer","fr":"virement bancaire","ch":"Ch.9 – Banque & finance", "tip":"Transparent (transférer de l'argent)."},
  {"id":332,"en":"bank draft (BD)","fr":"traite bancaire","ch":"Ch.9 – Banque & finance", "tip":"Un 'draft' = tirage ou traite dans le milieu bancaire."},
  {"id":333,"en":"bill of exchange","fr":"lettre de change","ch":"Ch.9 – Banque & finance", "tip":"Billet (bill) utilisé pour échanger de l'argent."},
  {"id":334,"en":"charge","fr":"facturer","ch":"Ch.9 – Banque & finance", "tip":"Faire payer (charger un prix)."},
  {"id":335,"en":"commercial paper","fr":"effet de commerce","ch":"Ch.9 – Banque & finance", "tip":"Pense au papier (paper) signé pour le commerce."},
  {"id":336,"en":"commitment","fr":"engagement","ch":"Ch.9 – Banque & finance", "tip":"Prendre un engagement ('commit' à faire quelque chose)."},
  {"id":337,"en":"credit rating","fr":"indice de solvabilité, note, score","ch":"Ch.9 – Banque & finance", "tip":"La 'note' (rating) de ton crédit (ex: AAA, BBB)."},
  {"id":338,"en":"downpayment","fr":"acompte","ch":"Ch.9 – Banque & finance", "tip":"Le paiement qu'on pose 'down' (sur la table) au début."},
  {"id":339,"en":"deferred","fr":"différé, à terme","ch":"Ch.9 – Banque & finance", "tip":"Transparent (repoussé à plus tard)."},
  {"id":340,"en":"deposit","fr":"verser, déposer, dépôt","ch":"Ch.9 – Banque & finance", "tip":"Transparent (déposer de l'argent)."},
  {"id":341,"en":"draft","fr":"traite","ch":"Ch.9 – Banque & finance", "tip":"Comme le brouillon, mais en banque c'est un tirage (traite)."},
  {"id":342,"en":"draw","fr":"tirer","ch":"Ch.9 – Banque & finance", "tip":"Tirer de l'argent (ou dessiner, selon le contexte)."},
  {"id":343,"en":"entitled to","fr":"qui a droit à","ch":"Ch.9 – Banque & finance", "tip":"Avoir le 'titre' (title) pour obtenir quelque chose."},
  {"id":344,"en":"HNWI=high net worth individual","fr":"personne fortunée","ch":"Ch.9 – Banque & finance", "tip":"High Net Worth = Haute Valeur Nette (les ultra-riches)."},
  {"id":345,"en":"instalment","fr":"versement, mensualité, livraison","ch":"Ch.9 – Banque & finance", "tip":"Payer en plusieurs 'installations' (mensualités)."},
  {"id":346,"en":"investment bank (US)","fr":"banque d'affaire","ch":"Ch.9 – Banque & finance", "tip":"La banque dédiée aux investissements et marchés financiers."},
  {"id":347,"en":"IOU=I Owe you","fr":"reconnaissance de dettes","ch":"Ch.9 – Banque & finance", "tip":"Phonétiquement : I (Je) Owe (dois) U (toi)."},
  {"id":348,"en":"letter of credit","fr":"lettre de crédit","ch":"Ch.9 – Banque & finance", "tip":"Transparent."},
  {"id":349,"en":"line of credit","fr":"ligne de crédit","ch":"Ch.9 – Banque & finance", "tip":"Transparent."},
  {"id":350,"en":"loan","fr":"prêt","ch":"Ch.9 – Banque & finance", "tip":"Pense au 'student loan' (prêt étudiant)."},
  {"id":351,"en":"merchant bank (UK)","fr":"banque d'affaire","ch":"Ch.9 – Banque & finance", "tip":"Banque des marchands = banque d'affaires anglaise."},
  {"id":352,"en":"money laundering","fr":"blanchiment d'argent","ch":"Ch.9 – Banque & finance", "tip":"Laundering vient de 'laundry' (laverie/blanchisserie)."},
  {"id":353,"en":"note","fr":"billet à ordre, lettre de change","ch":"Ch.9 – Banque & finance", "tip":"Une petite note/billet de promesse de paiement."},
  {"id":354,"en":"outstanding","fr":"impayé, en circulation","ch":"Ch.9 – Banque & finance", "tip":"Une dette qui 'se tient' (standing) 'dehors' (out), pas encore réglée."},
  {"id":355,"en":"pay back","fr":"rembourser","ch":"Ch.9 – Banque & finance", "tip":"Payer (pay) en retour (back)."},
  {"id":356,"en":"pay into","fr":"verser sur","ch":"Ch.9 – Banque & finance", "tip":"Payer 'à l'intérieur' (into) d'un compte."},
  {"id":357,"en":"portfolio management","fr":"gestion de portefeuille","ch":"Ch.9 – Banque & finance", "tip":"Transparent."},
  {"id":358,"en":"promissory note","fr":"billet à ordre","ch":"Ch.9 – Banque & finance", "tip":"Une note qui 'promet' (promise) de payer."},
  {"id":359,"en":"principal (n)","fr":"capital","ch":"Ch.9 – Banque & finance", "tip":"Le montant 'principal' de la dette (sans les intérêts)."},
  {"id":360,"en":"retainer","fr":"acompte","ch":"Ch.9 – Banque & finance", "tip":"L'avance payée pour 'retenir' les services d'un avocat."},
  {"id":361,"en":"savings","fr":"épargne","ch":"Ch.9 – Banque & finance", "tip":"Ce qu'on a 'sauvé' (save) ou mis de côté."},
  {"id":362,"en":"secure a loan","fr":"obtenir un prêt","ch":"Ch.9 – Banque & finance", "tip":"Sécuriser un prêt (avec des garanties pour l'obtenir)."},
  {"id":363,"en":"statement","fr":"relevé de compte","ch":"Ch.9 – Banque & finance", "tip":"L'état (state) ou la déclaration officielle de tes finances."},
  {"id":364,"en":"status inquiry","fr":"demande de renseignements (solvabilité)","ch":"Ch.9 – Banque & finance", "tip":"Enquête (inquiry) sur ton statut financier."},
  {"id":365,"en":"subtract","fr":"soustraire, déduire","ch":"Ch.9 – Banque & finance", "tip":"Transparent."},
  {"id":366,"en":"wealth management","fr":"gestion de fortune","ch":"Ch.9 – Banque & finance", "tip":"Management de la richesse (wealth)."},
  {"id":367,"en":"withdraw","fr":"retirer","ch":"Ch.9 – Banque & finance", "tip":"Tirer (draw) en arrière (with) = retirer des fonds."},
  {"id":368,"en":"withdrawal","fr":"retrait","ch":"Ch.9 – Banque & finance", "tip":"Le nom d'action pour withdraw."},
  {"id":369,"en":"audited","fr":"certifié","ch":"Ch.10 – Bourse & valeurs", "tip":"Les comptes ont passé l'audit avec succès."},
  {"id":370,"en":"annual report","fr":"rapport annuel","ch":"Ch.10 – Bourse & valeurs", "tip":"Transparent."},
  {"id":371,"en":"bear","fr":"produire, rapporter / baissier","ch":"Ch.10 – Bourse & valeurs", "tip":"Bourse : L'ours (bear) attaque en donnant un coup de patte vers le BAS = marché baissier."},
  {"id":372,"en":"bearish","fr":"à la baisse","ch":"Ch.10 – Bourse & valeurs", "tip":"Qui agit comme un ours (bear)."},
  {"id":373,"en":"bond","fr":"obligation","ch":"Ch.10 – Bourse & valeurs", "tip":"Un 'lien' (bond) financier, une dette émise par l'État ou l'entreprise."},
  {"id":374,"en":"broker","fr":"intermédiaire, courtier","ch":"Ch.10 – Bourse & valeurs", "tip":"Transparent (le broker de Wall Street)."},
  {"id":375,"en":"bull","fr":"haussier","ch":"Ch.10 – Bourse & valeurs", "tip":"Bourse : Le taureau (bull) encorne de BAS en HAUT = marché haussier."},
  {"id":376,"en":"bullish","fr":"à la hausse","ch":"Ch.10 – Bourse & valeurs", "tip":"Qui agit comme un taureau (bull)."},
  {"id":377,"en":"closing","fr":"clôture","ch":"Ch.10 – Bourse & valeurs", "tip":"Transparent (fermeture de la bourse ou d'un deal)."},
  {"id":378,"en":"debt security","fr":"titre de créance","ch":"Ch.10 – Bourse & valeurs", "tip":"Un titre/sécurité basé sur de la dette."},
  {"id":379,"en":"equities","fr":"actions côtées","ch":"Ch.10 – Bourse & valeurs", "tip":"Les capitaux propres/actions (synonyme de shares sur les marchés financiers)."},
  {"id":380,"en":"equity security","fr":"titre de participation","ch":"Ch.10 – Bourse & valeurs", "tip":"Un titre (security) basé sur du capital (equity)."},
  {"id":381,"en":"ex-dividend","fr":"sans dividende","ch":"Ch.10 – Bourse & valeurs", "tip":"'Ex' veut dire 'sans' (exclu). Action vendue sans droit au dividende en cours."},
  {"id":382,"en":"financial statements","fr":"états financiers","ch":"Ch.10 – Bourse & valeurs", "tip":"Transparent."},
  {"id":383,"en":"fixed-income security","fr":"produit obligataire","ch":"Ch.10 – Bourse & valeurs", "tip":"Un titre (security) à revenu (income) fixe (ex: obligations)."},
  {"id":384,"en":"insider dealing","fr":"délit d'initié","ch":"Ch.10 – Bourse & valeurs", "tip":"Faire des deals avec des infos de 'l'intérieur' (insider)."},
  {"id":385,"en":"leverage","fr":"financement","ch":"Ch.10 – Bourse & valeurs", "tip":"L'effet de 'levier' (s'endetter pour augmenter la renta)."},
  {"id":386,"en":"leveraged","fr":"endetté","ch":"Ch.10 – Bourse & valeurs", "tip":"Une boîte avec beaucoup d'effet de levier = elle est endettée."},
  {"id":387,"en":"OTC","fr":"hors cote / en vente libre","ch":"Ch.10 – Bourse & valeurs", "tip":"Over The Counter = par dessus le comptoir (échanges de gré à gré, hors bourse centralisée)."},
  {"id":388,"en":"par-value","fr":"valeur nominale","ch":"Ch.10 – Bourse & valeurs", "tip":"La valeur fixée 'au pair' (à l'origine)."},
  {"id":389,"en":"post","fr":"afficher","ch":"Ch.10 – Bourse & valeurs", "tip":"Pense à poster un message ou 'poster' des résultats financiers."},
  {"id":390,"en":"projection","fr":"prévision","ch":"Ch.10 – Bourse & valeurs", "tip":"Se projeter dans l'avenir (forecast financier)."},
  {"id":391,"en":"prospectus","fr":"prospectus","ch":"Ch.10 – Bourse & valeurs", "tip":"Transparent (document d'information obligatorie pour la bourse)."},
  {"id":392,"en":"quotation","fr":"cotation","ch":"Ch.10 – Bourse & valeurs", "tip":"Transparent."},
  {"id":393,"en":"returns","fr":"bénéfices, gains","ch":"Ch.10 – Bourse & valeurs", "tip":"Les 'retours' (sur investissement) / ROI."},
  {"id":394,"en":"rights issue","fr":"émission de droits de souscription","ch":"Ch.10 – Bourse & valeurs", "tip":"L'émission (issue) de droits (rights) pour les actionnaires actuels."},
  {"id":395,"en":"service a debt","fr":"rembourser une dette","ch":"Ch.10 – Bourse & valeurs", "tip":"Faire le 'service de la dette' (payer le principal + intérêts)."},
  {"id":396,"en":"SEC","fr":"Securities and Exchange Commission","ch":"Ch.10 – Bourse & valeurs", "tip":"L'autorité des marchés financiers (AMF) aux USA."},
  {"id":397,"en":"share","fr":"part, action","ch":"Ch.10 – Bourse & valeurs", "tip":"Partager (share) le capital = une action."},
  {"id":398,"en":"shareholder","fr":"actionnaire","ch":"Ch.10 – Bourse & valeurs", "tip":"Celui qui détient (holder) l'action (share)."},
  {"id":399,"en":"shareholding","fr":"actionnariat","ch":"Ch.10 – Bourse & valeurs", "tip":"L'ensemble de la détention d'actions."},
  {"id":400,"en":"stock exchange","fr":"bourse","ch":"Ch.10 – Bourse & valeurs", "tip":"Le lieu d'échange (exchange) des actions (stock)."},
  {"id":401,"en":"SWF* (sovereign wealth fund)","fr":"fonds souverain","ch":"Ch.10 – Bourse & valeurs", "tip":"Fonds de richesse (wealth) de l'État (sovereign)."},
  {"id":402,"en":"takeover","fr":"rachat, prise de contrôle","ch":"Ch.10 – Bourse & valeurs", "tip":"Prendre (take) complètement le dessus (over)."},
  {"id":403,"en":"UCITS","fr":"OPCVM","ch":"Ch.10 – Bourse & valeurs", "tip":"Acronyme barbare pour les fonds d'investissements européens standardisés."},
  {"id":404,"en":"warrant","fr":"warrant, certificat d'option titrisé","ch":"Ch.10 – Bourse & valeurs", "tip":"Transparent en finance (un bon de souscription)."},
  {"id":405,"en":"yield","fr":"rendement, produire","ch":"Ch.10 – Bourse & valeurs", "tip":"Ce que l'actif 'produit' comme fruit/rendement annuel."},
  {"id":406,"en":"accounting firm","fr":"cabinet d'audit","ch":"Ch.11 – Fiscalité & compta", "tip":"Firme de comptabilité (accounting)."},
  {"id":407,"en":"accounts payable","fr":"compte fournisseur","ch":"Ch.11 – Fiscalité & compta", "tip":"L'argent que tu 'dois payer' (payable) = tes fournisseurs."},
  {"id":408,"en":"accrue","fr":"s'accumuler","ch":"Ch.11 – Fiscalité & compta", "tip":"Pense aux intérêts qui 'accourent' et s'accumulent au fil du temps."},
  {"id":409,"en":"accrued interest","fr":"intérêts courus","ch":"Ch.11 – Fiscalité & compta", "tip":"Les intérêts déjà accumulés (courus) mais pas encore payés."},
  {"id":410,"en":"allocation","fr":"ventilation","ch":"Ch.11 – Fiscalité & compta", "tip":"Allouer/répartir les coûts dans différents postes comptables."},
  {"id":411,"en":"allowance","fr":"allocation, abattement","ch":"Ch.11 – Fiscalité & compta", "tip":"Ce que le fisc t'autorise (allow) à déduire."},
  {"id":412,"en":"amended","fr":"rectificative","ch":"Ch.11 – Fiscalité & compta", "tip":"Une déclaration d'impôts modifiée (amended)."},
  {"id":413,"en":"amortization","fr":"amortissement (prêt, actif incorporel)","ch":"Ch.11 – Fiscalité & compta", "tip":"Transparent. (NB: Souvent utilisé pour l'incorporel ou les emprunts)."},
  {"id":414,"en":"appropriation","fr":"affectation","ch":"Ch.11 – Fiscalité & compta", "tip":"S'approprier/affecter le résultat (bénéfice) vers les réserves ou dividendes."},
  {"id":415,"en":"assess a company","fr":"taxer une entreprise","ch":"Ch.11 – Fiscalité & compta", "tip":"Évaluer (assess) l'entreprise pour pouvoir calculer son impôt."},
  {"id":416,"en":"assets","fr":"actif, patrimoine","ch":"Ch.11 – Fiscalité & compta", "tip":"Ce que l'entreprise possède (la partie gauche du bilan)."},
  {"id":417,"en":"back-tax","fr":"arriéré d'impôts","ch":"Ch.11 – Fiscalité & compta", "tip":"Taxes qui sont restées 'en arrière' (non payées)."},
  {"id":418,"en":"bad debt","fr":"créance douteuse, irrécouvrable","ch":"Ch.11 – Fiscalité & compta", "tip":"Une 'mauvaise' dette qu'on ne te remboursera sûrement jamais."},
  {"id":419,"en":"balance sheet","fr":"bilan","ch":"Ch.11 – Fiscalité & compta", "tip":"La feuille (sheet) où l'actif et le passif s'équilibrent (balance)."},
  {"id":420,"en":"book value","fr":"valeur comptable","ch":"Ch.11 – Fiscalité & compta", "tip":"La valeur écrite dans les livres (books) de compte."},
  {"id":421,"en":"borrowings","fr":"emprunts","ch":"Ch.11 – Fiscalité & compta", "tip":"Ce qu'on a 'emprunté' (borrowed)."},
  {"id":422,"en":"bottom line","fr":"résultat financier","ch":"Ch.11 – Fiscalité & compta", "tip":"La toute dernière ligne (bottom line) du compte de résultat : le profit ou la perte final(e)."},
  {"id":423,"en":"breakdown","fr":"ventilation","ch":"Ch.11 – Fiscalité & compta", "tip":"Casser (break) le total en petits morceaux (down) = détailler."},
  {"id":424,"en":"break-even point","fr":"point mort, seuil de rentabilité","ch":"Ch.11 – Fiscalité & compta", "tip":"Le point où on 'casse' (break) à 'égalité' (even) = on ne gagne ni ne perd d'argent."},
  {"id":425,"en":"capex","fr":"dépenses d'investissement","ch":"Ch.11 – Fiscalité & compta", "tip":"CAPital EXpenditure (dépenses en capital)."},
  {"id":426,"en":"capital allowance","fr":"dotation aux amortissements fiscale","ch":"Ch.11 – Fiscalité & compta", "tip":"L'abattement (allowance) autorisé sur des dépenses d'investissement (UK)."},
  {"id":427,"en":"capital gains","fr":"plus-values","ch":"Ch.11 – Fiscalité & compta", "tip":"Les gains gagnés sur le capital revendu plus cher."},
  {"id":428,"en":"capital losses","fr":"moins-values","ch":"Ch.11 – Fiscalité & compta", "tip":"Les pertes (losses) sur le capital."},
  {"id":429,"en":"capital surplus","fr":"prime d'émission","ch":"Ch.11 – Fiscalité & compta", "tip":"Le surplus d'argent apporté par les actionnaires au-dessus du capital nominal."},
  {"id":430,"en":"carry back","fr":"report en arrière","ch":"Ch.11 – Fiscalité & compta", "tip":"Porter (carry) ses pertes vers l'arrière (back) pour récupérer de l'impôt payé avant."},
  {"id":431,"en":"carry forward","fr":"report en avant","ch":"Ch.11 – Fiscalité & compta", "tip":"Porter ses pertes vers l'avant (forward) pour payer moins d'impôts plus tard."},
  {"id":432,"en":"cash flow","fr":"cash flow, MBA","ch":"Ch.11 – Fiscalité & compta", "tip":"Le flux (flow) d'argent liquide (cash)."},
  {"id":433,"en":"CPA (certified public accountant)","fr":"expert-comptable US","ch":"Ch.11 – Fiscalité & compta", "tip":"Le comptable (accountant) public certifié."},
  {"id":434,"en":"charge off","fr":"charge exceptionnelle","ch":"Ch.11 – Fiscalité & compta", "tip":"Rayer (off) une dette irrécupérable des comptes en l'assumant comme perte."},
  {"id":435,"en":"chartered accountant","fr":"expert-comptable","ch":"Ch.11 – Fiscalité & compta", "tip":"Comptable agréé par charte (UK)."},
  {"id":436,"en":"claim","fr":"créance, demande, réclamation","ch":"Ch.11 – Fiscalité & compta", "tip":"Réclamer ce qui t'es dû (créance)."},
  {"id":437,"en":"close the books","fr":"clôturer les comptes","ch":"Ch.11 – Fiscalité & compta", "tip":"Fermer les livres de compte à la fin de l'exercice."},
  {"id":438,"en":"collect taxes","fr":"percevoir des impôts","ch":"Ch.11 – Fiscalité & compta", "tip":"Collecter l'impôt."},
  {"id":439,"en":"common stock","fr":"action ordinaire","ch":"Ch.11 – Fiscalité & compta", "tip":"L'action commune de base, sans droits particuliers."},
  {"id":440,"en":"contribution","fr":"cotisation, versement","ch":"Ch.11 – Fiscalité & compta", "tip":"Contribuer (aux charges sociales par exemple)."},
  {"id":441,"en":"corporation tax","fr":"impôt sur les sociétés","ch":"Ch.11 – Fiscalité & compta", "tip":"La taxe payée par les corporations = IS."},
  {"id":442,"en":"cost price","fr":"prix de revient","ch":"Ch.11 – Fiscalité & compta", "tip":"Le prix que ça te coûte à produire."},
  {"id":443,"en":"cost-effective","fr":"rentable","ch":"Ch.11 – Fiscalité & compta", "tip":"C'est 'efficace' compte tenu du 'coût'."},
  {"id":444,"en":"current assets","fr":"actif circulant","ch":"Ch.11 – Fiscalité & compta", "tip":"Les actifs 'courants' (qui tournent vite : cash, stocks)."},
  {"id":445,"en":"cross-border","fr":"transfrontalier","ch":"Ch.11 – Fiscalité & compta", "tip":"Qui croise (cross) les frontières (border)."},
  {"id":446,"en":"deferral","fr":"report, étalement","ch":"Ch.11 – Fiscalité & compta", "tip":"Différer (payer l'impôt plus tard)."},
  {"id":447,"en":"depreciation","fr":"dépréciation, amortissement (actif corporel)","ch":"Ch.11 – Fiscalité & compta", "tip":"Perte de valeur physique (usure d'une machine)."},
  {"id":448,"en":"derived from","fr":"tiré de","ch":"Ch.11 – Fiscalité & compta", "tip":"Transparent (dérivé de cette source de revenus)."},
  {"id":449,"en":"discount","fr":"décote, remise, escompter","ch":"Ch.11 – Fiscalité & compta", "tip":"Le contraire de premium. Une remise de prix."},
  {"id":450,"en":"dues","fr":"cotisations","ch":"Ch.11 – Fiscalité & compta", "tip":"Les sommes qui sont dues (union dues = cotisations syndicales)."},
  {"id":451,"en":"earnings","fr":"profits, bénéfices","ch":"Ch.11 – Fiscalité & compta", "tip":"Ce que l'entreprise gagne (earn) = les bénéfices net."},
  {"id":452,"en":"EBIT","fr":"résultat opérationnel","ch":"Ch.11 – Fiscalité & compta", "tip":"Earnings Before Interest and Taxes (bénéfice avant qu'on ne retire les intérêts et les impôts)."},
  {"id":453,"en":"entry","fr":"écriture","ch":"Ch.11 – Fiscalité & compta", "tip":"Une entrée dans le logiciel de compta (passer une écriture)."},
  {"id":454,"en":"equity","fr":"action, fonds propres","ch":"Ch.11 – Fiscalité & compta", "tip":"Faux-ami financier récurrent. Représente le capital propre."},
  {"id":455,"en":"estate","fr":"patrimoine","ch":"Ch.11 – Fiscalité & compta", "tip":"Le domaine, la succession (real estate = immobilier)."},
  {"id":456,"en":"exemption","fr":"exonération","ch":"Ch.11 – Fiscalité & compta", "tip":"Être exempté de payer l'impôt."},
  {"id":457,"en":"expenses","fr":"dépenses","ch":"Ch.11 – Fiscalité & compta", "tip":"Transparent."},
  {"id":458,"en":"fair value","fr":"valeur vénale","ch":"Ch.11 – Fiscalité & compta", "tip":"La 'juste' valeur (le prix de marché normal d'un bien)."},
  {"id":459,"en":"flat tax","fr":"impôt forfaitaire","ch":"Ch.11 – Fiscalité & compta", "tip":"Une taxe 'plate', identique pour tout le monde sans tranches progressives."},
  {"id":460,"en":"financial year","fr":"exercice","ch":"Ch.11 – Fiscalité & compta", "tip":"L'année financière de l'entreprise."},
  {"id":461,"en":"file a claim","fr":"déposer une réclamation","ch":"Ch.11 – Fiscalité & compta", "tip":"Mettre dans le dossier (file) ta plainte fiscale."},
  {"id":462,"en":"fiscal year","fr":"exercice","ch":"Ch.11 – Fiscalité & compta", "tip":"L'année fiscale (souvent synonyme de financial year)."},{"id":463,"en":"graduated","fr":"progressif","ch":"Ch.11 – Fiscalité & compta", "tip":"Comme des 'grades' d'escalier, l'impôt monte par paliers."},
  {"id":464,"en":"idle","fr":"non productif","ch":"Ch.11 – Fiscalité & compta", "tip":"Pense à une machine 'en veille' (idle) qui ne tourne pas."},
  {"id":465,"en":"impairment","fr":"perte de valeur","ch":"Ch.11 – Fiscalité & compta", "tip":"Repair = réparer. Impair = abîmer/perdre de la valeur."},
  {"id":466,"en":"impairment test","fr":"test de dépréciation","ch":"Ch.11 – Fiscalité & compta", "tip":"Le test pour voir si l'actif est abîmé/déprécié."},
  {"id":467,"en":"impairment value","fr":"valeur résiduelle","ch":"Ch.11 – Fiscalité & compta", "tip":"La valeur qui reste après la perte (impairment)."},
  {"id":468,"en":"income","fr":"revenu","ch":"Ch.11 – Fiscalité & compta", "tip":"L'argent qui 'vient dedans' (in-come)."},
  {"id":469,"en":"income statement","fr":"compte de résultat","ch":"Ch.11 – Fiscalité & compta", "tip":"L'état (statement) de tes revenus (income)."},
  {"id":470,"en":"income tax","fr":"impôt sur le revenu","ch":"Ch.11 – Fiscalité & compta", "tip":"La taxe sur ce qui rentre."},
  {"id":471,"en":"input VAT","fr":"TVA déductible","ch":"Ch.11 – Fiscalité & compta", "tip":"La TVA sur ce qu'on achète/qui entre (input) qu'on peut déduire."},
  {"id":472,"en":"intangible assets","fr":"actifs incorporels","ch":"Ch.11 – Fiscalité & compta", "tip":"Qu'on ne peut pas toucher (tangible = palpable)."},
  {"id":473,"en":"intragroup","fr":"intra-groupe","ch":"Ch.11 – Fiscalité & compta", "tip":"À l'intérieur du groupe."},
  {"id":474,"en":"IRS (internal revenue service)","fr":"fisc américain","ch":"Ch.11 – Fiscalité & compta", "tip":"Le fisc américain (Internal Revenue Service)."},
  {"id":475,"en":"item","fr":"poste (bilan)","ch":"Ch.11 – Fiscalité & compta", "tip":"Un élément spécifique dans la liste du bilan."},
  {"id":476,"en":"itemize","fr":"être au réel (déclaration de revenus)","ch":"Ch.11 – Fiscalité & compta", "tip":"Lister chaque dépense 'item' par 'item' pour déduire ses frais réels."},
  {"id":477,"en":"inventory","fr":"stock","ch":"Ch.11 – Fiscalité & compta", "tip":"Faire l'inventaire de ses stocks."},
  {"id":478,"en":"land tax","fr":"taxe foncière","ch":"Ch.11 – Fiscalité & compta", "tip":"La taxe sur la terre (land)."},
  {"id":479,"en":"ledger","fr":"registre / grand livre","ch":"Ch.11 – Fiscalité & compta", "tip":"Le gros livre de comptes (pense à un registre lourd)."},
  {"id":480,"en":"levy a tax on","fr":"percevoir un impôt sur","ch":"Ch.11 – Fiscalité & compta", "tip":"Lever (levy) un impôt."},
  {"id":481,"en":"liabilities","fr":"dettes, passif","ch":"Ch.11 – Fiscalité & compta", "tip":"Ce dont tu es responsable/redevable (liable) financièrement."},
  {"id":482,"en":"liable to","fr":"assujetti à","ch":"Ch.11 – Fiscalité & compta", "tip":"Être responsable ou soumis à une obligation légale."},
  {"id":483,"en":"lump sum","fr":"somme forfaitaire","ch":"Ch.11 – Fiscalité & compta", "tip":"Un 'bloc' (lump) d'argent payé d'un seul coup."},
  {"id":484,"en":"market value","fr":"valeur marchande","ch":"Ch.11 – Fiscalité & compta", "tip":"La valeur sur le marché."},
  {"id":485,"en":"mark-up","fr":"marge","ch":"Ch.11 – Fiscalité & compta", "tip":"La marge qu'on 'marque en plus' (up) sur le prix de base."},
  {"id":486,"en":"minority interest","fr":"intérêt des minoritaires","ch":"Ch.11 – Fiscalité & compta", "tip":"Les intérêts de ceux qui n'ont pas la majorité."},
  {"id":487,"en":"net operating income","fr":"résultat d'exploitation net","ch":"Ch.11 – Fiscalité & compta", "tip":"Les revenus nets liés aux opérations de base."},
  {"id":488,"en":"offset","fr":"compenser","ch":"Ch.11 – Fiscalité & compta", "tip":"Annuler une perte par un gain ('set off' l'un par rapport à l'autre)."},
  {"id":489,"en":"one-off","fr":"exceptionnel","ch":"Ch.11 – Fiscalité & compta", "tip":"Qui n'arrive qu'une (one) seule fois."},
  {"id":490,"en":"operating cash flow","fr":"capacité d'autofinancement","ch":"Ch.11 – Fiscalité & compta", "tip":"Le cash généré par les opérations courantes."},
  {"id":491,"en":"operating profit","fr":"résultat d'exploitation","ch":"Ch.11 – Fiscalité & compta", "tip":"Le profit des opérations directes."},
  {"id":492,"en":"opex","fr":"charges d'exploitation","ch":"Ch.11 – Fiscalité & compta", "tip":"Acronyme: OPperational EXpenditures."},
  {"id":493,"en":"output VAT","fr":"TVA collectée","ch":"Ch.11 – Fiscalité & compta", "tip":"La TVA sur ce qu'on vend/qui sort (output)."},
  {"id":494,"en":"overheads","fr":"frais généraux","ch":"Ch.11 – Fiscalité & compta", "tip":"Les frais qui 'planent au-dessus' de ta tête (loyer, assurance) peu importe tes ventes."},
  {"id":495,"en":"payables","fr":"dettes à payer","ch":"Ch.11 – Fiscalité & compta", "tip":"Les factures qu'on est 'obligé' de payer."},
  {"id":496,"en":"personal income tax","fr":"impôt sur le revenu","ch":"Ch.11 – Fiscalité & compta", "tip":"Impôt personnel sur les revenus (IRPP)."},
  {"id":497,"en":"prepaid","fr":"constaté d'avance","ch":"Ch.11 – Fiscalité & compta", "tip":"Payé à l'avance (pre-paid)."},
  {"id":498,"en":"preferred stock","fr":"actions de préférence","ch":"Ch.11 – Fiscalité & compta", "tip":"Actions avec des droits 'préférés' (ex: dividendes prioritaires)."},
  {"id":499,"en":"pretax earnings","fr":"bénéfices avant impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"Avant (pre) les taxes."},
  {"id":500,"en":"proceeds","fr":"revenus, recettes, produit","ch":"Ch.11 – Fiscalité & compta", "tip":"Le produit financier qui 'procède' d'une vente."},
  {"id":501,"en":"projected","fr":"prévu","ch":"Ch.11 – Fiscalité & compta", "tip":"Projeté dans le futur."},
  {"id":502,"en":"profit margin","fr":"marge bénéficiaire","ch":"Ch.11 – Fiscalité & compta", "tip":"La marge de profit."},
  {"id":503,"en":"prorated","fr":"au prorata","ch":"Ch.11 – Fiscalité & compta", "tip":"Calculé au prorata temporis."},
  {"id":504,"en":"rate","fr":"taux","ch":"Ch.11 – Fiscalité & compta", "tip":"Le taux d'intérêt ou le taux d'imposition (tax rate)."},
  {"id":505,"en":"receivables","fr":"créances","ch":"Ch.11 – Fiscalité & compta", "tip":"L'argent qu'on a le droit de 'recevoir' des clients."},
  {"id":506,"en":"redeem","fr":"rembourser, amortir","ch":"Ch.11 – Fiscalité & compta", "tip":"Racheter ou se faire rembourser une obligation (pense à 'réclamer son dû')."},
  {"id":507,"en":"retained earnings","fr":"RAN, revenus non distribués","ch":"Ch.11 – Fiscalité & compta", "tip":"Les gains (earnings) conservés/retenus (retained) dans l'entreprise, non distribués en dividendes."},
  {"id":508,"en":"revenue","fr":"chiffre d'affaires","ch":"Ch.11 – Fiscalité & compta", "tip":"Faux-ami : le 'revenue' d'une boîte, c'est son Chiffre d'Affaires total, pas son bénéfice."},
  {"id":509,"en":"shareholder equity","fr":"fonds propres, capitaux propres","ch":"Ch.11 – Fiscalité & compta", "tip":"L'équité (capital) appartenant aux actionnaires."},
  {"id":510,"en":"statutory auditor","fr":"commissaire aux comptes","ch":"Ch.11 – Fiscalité & compta", "tip":"L'auditeur requis par les statuts/la loi (statute)."},
  {"id":511,"en":"sundries","fr":"divers","ch":"Ch.11 – Fiscalité & compta", "tip":"Les petites dépenses diverses (pense à 'sundry items')."},
  {"id":512,"en":"surtax","fr":"contribution additionnelle","ch":"Ch.11 – Fiscalité & compta", "tip":"Une taxe 'sur' (en plus de) la taxe."},
  {"id":513,"en":"table","fr":"tableau","ch":"Ch.11 – Fiscalité & compta", "tip":"Comme un tableau de chiffres (table)."},
  {"id":514,"en":"tax adjustment","fr":"redressement fiscal","ch":"Ch.11 – Fiscalité & compta", "tip":"Le fisc 'ajuste' (corrige) ta déclaration à la hausse."},
  {"id":515,"en":"tax allowance","fr":"abattement fiscal","ch":"Ch.11 – Fiscalité & compta", "tip":"La déduction que le fisc 'autorise' (allow)."},
  {"id":516,"en":"tax audit","fr":"contrôle fiscal","ch":"Ch.11 – Fiscalité & compta", "tip":"L'audit de tes comptes par le fisc."},
  {"id":517,"en":"tax authorities","fr":"fisc","ch":"Ch.11 – Fiscalité & compta", "tip":"Les autorités fiscales."},
  {"id":518,"en":"tax basis","fr":"assiette de l'impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"La 'base' sur laquelle on calcule l'impôt."},
  {"id":519,"en":"tax basis erosion","fr":"minoration de l'assiette fiscale","ch":"Ch.11 – Fiscalité & compta", "tip":"Éroder (ronger) la base imposable pour payer moins d'impôts."},
  {"id":520,"en":"tax bracket","fr":"tranche fiscale","ch":"Ch.11 – Fiscalité & compta", "tip":"Un 'bracket' est un crochet ou un intervalle (la tranche d'impôt)."},
  {"id":521,"en":"tax break","fr":"crédit d'impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"Une 'pause/cadeau' (break) fiscale."},
  {"id":522,"en":"tax burden","fr":"charge fiscale","ch":"Ch.11 – Fiscalité & compta", "tip":"Le 'fardeau' (burden) des impôts."},
  {"id":523,"en":"tax credit","fr":"crédit d'impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"Un crédit direct sur les impôts à payer."},
  {"id":524,"en":"tax evasion","fr":"évasion fiscale","ch":"Ch.11 – Fiscalité & compta", "tip":"S'évader de ses obligations (le terme anglais est toujours illégal)."},
  {"id":525,"en":"tax exemption","fr":"exonération fiscale","ch":"Ch.11 – Fiscalité & compta", "tip":"Être exempté (on ne paie pas)."},
  {"id":526,"en":"tax filing","fr":"déclaration d'impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"Le fait de déposer (file) sa liasse fiscale."},
  {"id":527,"en":"tax liability","fr":"impôt dû, assujettissement à l'impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"Ta 'dette/obligation' (liability) envers le fisc."},
  {"id":528,"en":"tax practitioner","fr":"fiscaliste","ch":"Ch.11 – Fiscalité & compta", "tip":"Celui qui 'pratique' le droit fiscal."},
  {"id":529,"en":"tax reassessment","fr":"redressement fiscal","ch":"Ch.11 – Fiscalité & compta", "tip":"Le fisc te ré-évalue (re-assess) à la hausse."},
  {"id":530,"en":"tax relief","fr":"allégement d'impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"Un 'soulagement' (relief) fiscal."},
  {"id":531,"en":"tax return","fr":"déclaration d'impôt","ch":"Ch.11 – Fiscalité & compta", "tip":"Le formulaire qu'on 'retourne' au fisc chaque année."},
  {"id":532,"en":"tax status","fr":"régime fiscal","ch":"Ch.11 – Fiscalité & compta", "tip":"Ton statut face à l'impôt."},
  {"id":533,"en":"tax treatment","fr":"régime fiscal","ch":"Ch.11 – Fiscalité & compta", "tip":"Comment tel ou tel gain est 'traité' fiscalement."},
  {"id":534,"en":"tax treaty","fr":"convention fiscale","ch":"Ch.11 – Fiscalité & compta", "tip":"Le 'traité' entre pays pour éviter la double imposition."},
  {"id":535,"en":"trading account","fr":"compte d'exploitation","ch":"Ch.11 – Fiscalité & compta", "tip":"Le compte qui suit le 'commerce' quotidien."},
  {"id":536,"en":"treasury stock","fr":"action propre, autodétenue","ch":"Ch.11 – Fiscalité & compta", "tip":"Les actions que la société garde dans son propre 'trésor'."},
  {"id":537,"en":"turnover","fr":"chiffre d'affaires","ch":"Ch.11 – Fiscalité & compta", "tip":"L'argent qui 'tourne' (turn) dans l'entreprise. (Mot surtout utilisé en UK)."},
  {"id":538,"en":"underreport","fr":"sous-déclarer ses revenus","ch":"Ch.11 – Fiscalité & compta", "tip":"Déclarer (report) 'en dessous' (under) de la vérité."},
  {"id":539,"en":"VAT","fr":"TVA","ch":"Ch.11 – Fiscalité & compta", "tip":"Value Added Tax = Taxe sur la Valeur Ajoutée."},
  {"id":540,"en":"wealth tax","fr":"impôt sur la fortune","ch":"Ch.11 – Fiscalité & compta", "tip":"Taxe sur la richesse (wealth) = ISF/IFI."},
  {"id":541,"en":"write down","fr":"déprécier","ch":"Ch.11 – Fiscalité & compta", "tip":"Écrire une valeur plus basse (down) dans les comptes."},
  {"id":542,"en":"write off","fr":"déprécier complètement, annuler","ch":"Ch.11 – Fiscalité & compta", "tip":"L'effacer ('off') complètement des livres."},
  {"id":543,"en":"write up","fr":"réévaluer","ch":"Ch.11 – Fiscalité & compta", "tip":"Réécrire à la hausse (up)."},
  {"id":544,"en":"withhold","fr":"retenir","ch":"Ch.11 – Fiscalité & compta", "tip":"Tenir (hold) 'avec'/'en arrière' (with) = prélever ou retenir."},
  {"id":545,"en":"withholding tax","fr":"retenue à la source","ch":"Ch.11 – Fiscalité & compta", "tip":"La taxe qu'on 'retient' sur ton salaire avant de te le donner."},
  {"id":546,"en":"working capital","fr":"BFR / fonds de roulement","ch":"Ch.11 – Fiscalité & compta", "tip":"Le capital qui 'travaille' au quotidien pour faire tourner la boîte."},
  {"id":547,"en":"charge","fr":"grever","ch":"Ch.14 – Droit des biens", "tip":"Mettre une charge/un poids sur un bien (hypothèque)."},
  {"id":548,"en":"chattels","fr":"biens meubles","ch":"Ch.14 – Droit des biens", "tip":"Moyen mnémotechnique : les 'chats' (animaux) sont des biens meubles qui bougent."},
  {"id":549,"en":"collateral","fr":"bien donné en garantie","ch":"Ch.14 – Droit des biens", "tip":"Ce qu'on met 'à côté' pour garantir un prêt (un gage)."},
  {"id":550,"en":"easement","fr":"droit de passage","ch":"Ch.14 – Droit des biens", "tip":"Ce qui donne de l''aisance' (ease) pour traverser le terrain du voisin."},
  {"id":551,"en":"estate","fr":"patrimoine, masse successorale","ch":"Ch.14 – Droit des biens", "tip":"Les 'domaines/états' d'une personne (souvent décédée)."},
  {"id":552,"en":"freehold","fr":"pleine propriété","ch":"Ch.14 – Droit des biens", "tip":"Une possession (hold) totalement libre (free) et absolue."},
  {"id":553,"en":"foreclosure","fr":"saisie immobilière","ch":"Ch.14 – Droit des biens", "tip":"On 'ferme' (close) la porte (fore) devant le propriétaire qui n'a pas payé son crédit."},
  {"id":554,"en":"lease","fr":"bail","ch":"Ch.14 – Droit des biens", "tip":"Transparent avec le 'leasing' de voiture."},
  {"id":555,"en":"landlord","fr":"propriétaire","ch":"Ch.14 – Droit des biens", "tip":"Le 'seigneur' (lord) de la terre (land)."},
  {"id":556,"en":"misuse","fr":"abus","ch":"Ch.14 – Droit des biens", "tip":"Le 'mauvais' (mis) usage."},
  {"id":557,"en":"mortgage","fr":"hypothèque","ch":"Ch.14 – Droit des biens", "tip":"Pense aux prêts immobiliers de la crise de 2008 (les sub-mortgages/subprimes)."},
  {"id":558,"en":"ownership","fr":"propriété","ch":"Ch.14 – Droit des biens", "tip":"L'état d'être le propriétaire (owner)."},
  {"id":559,"en":"retention clause","fr":"clause de réserve de propriété","ch":"Ch.14 – Droit des biens", "tip":"Clause pour 'retenir' la propriété tant que la marchandise n'est pas payée."},
  {"id":560,"en":"security interest","fr":"sûreté","ch":"Ch.14 – Droit des biens", "tip":"Un droit (interest) pour 'sécuriser' une dette sur un bien matériel."},
  {"id":561,"en":"seize","fr":"saisir","ch":"Ch.14 – Droit des biens", "tip":"Transparent (saisir des biens par huissier)."},
  {"id":562,"en":"tenant","fr":"locataire","ch":"Ch.14 – Droit des biens", "tip":"Celui qui 'tient' le logement (le preneur à bail)."},
  {"id":563,"en":"title","fr":"titre de propriété","ch":"Ch.14 – Droit des biens", "tip":"Le titre officiel prouvant l'ownership."},
  {"id":564,"en":"Act of God","fr":"catastrophe naturelle prévue dans le contrat","ch":"Ch.19 – Droit des contrats", "tip":"Un acte de 'Dieu' (force majeure extrême) : foudre, ouragan, inondation."},
  {"id":565,"en":"amendment","fr":"avenant","ch":"Ch.19 – Droit des contrats", "tip":"Une modification (amendement) au contrat initial."},
  {"id":566,"en":"appendix","fr":"annexe","ch":"Ch.19 – Droit des contrats", "tip":"L'appendice (comme dans le corps humain) attaché à la fin du contrat principal."},
  {"id":567,"en":"arbitration","fr":"arbitrage","ch":"Ch.19 – Droit des contrats", "tip":"Régler un litige avec un arbitre privé plutôt qu'un juge public."},
  {"id":568,"en":"assignment","fr":"cession","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami redoutable : 'assigner' un contrat en common law = le céder à quelqu'un d'autre."},
  {"id":569,"en":"assignee","fr":"cessionnaire","ch":"Ch.19 – Droit des contrats", "tip":"Le suffixe '-ee' désigne la victime ou celui qui 'reçoit' le droit cédé."},
  {"id":570,"en":"assignor","fr":"cédant","ch":"Ch.19 – Droit des contrats", "tip":"Le suffixe '-or' désigne celui qui 'donne' le droit cédé."},
  {"id":571,"en":"bill of lading","fr":"connaissement","ch":"Ch.19 – Droit des contrats", "tip":"Document de transport maritime (to lade = charger un navire de marchandises)."},
  {"id":572,"en":"binding","fr":"qui lie, engage","ch":"Ch.19 – Droit des contrats", "tip":"Pense à 'bind' (attacher/lier) : un accord 'legally binding' est juridiquement contraignant."},
  {"id":573,"en":"boilerplate clause","fr":"clause-type","ch":"Ch.19 – Droit des contrats", "tip":"Les clauses génériques copiées-collées à la fin de tous les contrats (pense à une plaque de métal moulée à l'identique)."},
  {"id":574,"en":"business day","fr":"jour ouvrable","ch":"Ch.19 – Droit des contrats", "tip":"Un jour de 'business' (du lundi au vendredi)."},
  {"id":575,"en":"breach of contract","fr":"violation, inexécution","ch":"Ch.19 – Droit des contrats", "tip":"Une 'brèche' (breach) dans le contrat : on n'a pas respecté sa promesse."},
  {"id":576,"en":"by operation of law","fr":"pour motif imputable à la loi","ch":"Ch.19 – Droit des contrats", "tip":"Qui s'opère par la force de la loi (et non par un choix des parties)."},
  {"id":577,"en":"caveat emptor","fr":"aux risques de l'acheteur","ch":"Ch.19 – Droit des contrats", "tip":"Latin juridique : 'Que l'acheteur soit vigilant'. L'acheteur achète en l'état sans garantie de vice caché."},
  {"id":578,"en":"clause","fr":"clause","ch":"Ch.19 – Droit des contrats", "tip":"Transparent."},
  {"id":579,"en":"condition precedent","fr":"condition suspensive","ch":"Ch.19 – Droit des contrats", "tip":"Condition qui doit arriver 'avant' (precedent) que le contrat ne puisse s'appliquer."},
  {"id":580,"en":"condition subsequent","fr":"condition résolutoire","ch":"Ch.19 – Droit des contrats", "tip":"Condition qui, si elle arrive 'après' (subsequent), annule/résout le contrat."},
  {"id":581,"en":"consent","fr":"consentement","ch":"Ch.19 – Droit des contrats", "tip":"L'accord de volonté des parties."},
  {"id":582,"en":"consideration","fr":"contrepartie (contrat synallagmatique)","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami juridique majeur. En common law, sans 'consideration' (un prix ou une promesse en échange), un contrat est nul."},
  {"id":583,"en":"cure","fr":"remédier à","ch":"Ch.19 – Droit des contrats", "tip":"Apporter un 'remède' (cure) à une violation de contrat avant qu'il ne soit trop tard."},
  {"id":584,"en":"deceit","fr":"tromperie","ch":"Ch.19 – Droit des contrats", "tip":"Décevoir/tromper intentionnellement la confiance de l'autre."},
  {"id":585,"en":"decree","fr":"décret, arrêt","ch":"Ch.19 – Droit des contrats", "tip":"Une décision de justice (souvent en equity)."},{"id":586,"en":"defaulting party","fr":"partie défaillante","ch":"Ch.19 – Droit des contrats", "tip":"La partie qui fait 'défaut' (default) à ses obligations."},
  {"id":587,"en":"discharge","fr":"extinction","ch":"Ch.19 – Droit des contrats", "tip":"Le contrat est 'déchargé' de ses effets (les obligations sont éteintes)."},
  {"id":588,"en":"duress","fr":"contrainte, violence","ch":"Ch.19 – Droit des contrats", "tip":"Agir sous une pression 'dure' (ex: signer avec un pistolet sur la tempe)."},
  {"id":589,"en":"execute","fr":"signer","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami : 'execute a contract' = signer un contrat, pas tuer quelqu'un !"},
  {"id":590,"en":"fair use","fr":"usage loyal","ch":"Ch.19 – Droit des contrats", "tip":"Usage 'juste' (fair). Exception au droit d'auteur (courant aux USA)."},
  {"id":591,"en":"force majeure","fr":"force majeure","ch":"Ch.19 – Droit des contrats", "tip":"C'est du français ! Les Anglais utilisent notre terme pour ça."},
  {"id":592,"en":"forum non conveniens","fr":"tribunal inadapté","ch":"Ch.19 – Droit des contrats", "tip":"Latin : le forum (tribunal) n'est pas convenable pour juger l'affaire."},
  {"id":593,"en":"fraudulent misrepresentation","fr":"fausse déclaration volontaire","ch":"Ch.19 – Droit des contrats", "tip":"Faire une mauvaise (mis) représentation de la réalité, dans un but frauduleux."},
  {"id":594,"en":"frustration","fr":"impossibilité d'exécution","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami juridique. Le contrat est 'frustré' = il ne peut plus s'exécuter à cause d'un événement imprévu."},
  {"id":595,"en":"hereunder","fr":"au titre de la présente","ch":"Ch.19 – Droit des contrats", "tip":"Mot de jargon contractuel : 'under here' = sous ce contrat."},
  {"id":596,"en":"in witness whereof","fr":"en foi de quoi","ch":"Ch.19 – Droit des contrats", "tip":"Pour 'témoigner' (witness) de 'quoi' (whereof) -> Phrase type à la fin des contrats avant signatures."},
  {"id":597,"en":"lapse","fr":"caducité, expirer","ch":"Ch.19 – Droit des contrats", "tip":"Pense au 'time-lapse' : le temps s'est écoulé, l'offre a expiré."},
  {"id":598,"en":"liquidated damages","fr":"clause pénale","ch":"Ch.19 – Droit des contrats", "tip":"Dommages-intérêts 'liquides' (le montant est déjà pré-calculé dans le contrat en cas de faute)."},
  {"id":599,"en":"material","fr":"substantiel","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami : 'a material breach' = une violation grave/substantielle du contrat (pas 'matérielle')."},
  {"id":600,"en":"miscellaneous","fr":"divers","ch":"Ch.19 – Droit des contrats", "tip":"Souvent abrégé 'Misc.' = le titre fourre-tout à la fin du contrat."},
  {"id":601,"en":"misrepresentation","fr":"déclaration inexacte","ch":"Ch.19 – Droit des contrats", "tip":"Présenter (representation) de travers (mis)."},
  {"id":602,"en":"mistake","fr":"erreur","ch":"Ch.19 – Droit des contrats", "tip":"Transparent (souvent cause de nullité)."},
  {"id":603,"en":"mutual mistake","fr":"erreur commune aux deux parties","ch":"Ch.19 – Droit des contrats", "tip":"Erreur mutuelle (les deux se sont trompés)."},
  {"id":604,"en":"now, therefore","fr":"ceci étant exposé","ch":"Ch.19 – Droit des contrats", "tip":"Transition classique dans le préambule : 'Maintenant, en conséquence...'"},
  {"id":605,"en":"party","fr":"partie","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami : la partie au contrat (pas la fête)."},
  {"id":606,"en":"performance","fr":"exécution","ch":"Ch.19 – Droit des contrats", "tip":"La 'performance' d'un contrat = le fait de l'exécuter jusqu'au bout."},
  {"id":607,"en":"promissory estoppel","fr":"force obligatoire de la promesse","ch":"Ch.19 – Droit des contrats", "tip":"Tu es 'stoppé' (estoppel) de revenir sur ta promesse si l'autre a agi en s'appuyant dessus."},
  {"id":608,"en":"provision","fr":"disposition","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami : une 'provision' of law = une disposition de la loi (un article)."},
  {"id":609,"en":"privity","fr":"effet relatif du contrat","ch":"Ch.19 – Droit des contrats", "tip":"Le cercle 'privé' du contrat (il ne lie que les signataires)."},
  {"id":610,"en":"recitals","fr":"exposé préalable","ch":"Ch.19 – Droit des contrats", "tip":"Ce qui est 'récité' au tout début du contrat pour donner le contexte ('Attendu que...')."},
  {"id":611,"en":"repudiation","fr":"inexécution anticipée","ch":"Ch.19 – Droit des contrats", "tip":"On 'répudie' le contrat avant même de devoir l'exécuter."},
  {"id":612,"en":"rescission","fr":"nullité, retour au status quo ante","ch":"Ch.19 – Droit des contrats", "tip":"On efface tout et on remet les choses comme elles étaient avant (rescinder)."},
  {"id":613,"en":"remedy","fr":"recours","ch":"Ch.19 – Droit des contrats", "tip":"Le 'remède' judiciaire pour réparer une faute."},
  {"id":614,"en":"specific performance","fr":"exécution forcée","ch":"Ch.19 – Droit des contrats", "tip":"Le juge te force à 'performer' (exécuter) l'action 'spécifique' promise au lieu de payer des dommages."},
  {"id":615,"en":"subject matter of a contract","fr":"objet d'un contrat","ch":"Ch.19 – Droit des contrats", "tip":"Le 'sujet' (matière) principal du contrat."},
  {"id":616,"en":"term","fr":"condition, durée","ch":"Ch.19 – Droit des contrats", "tip":"Terms and conditions = les termes et conditions."},
  {"id":617,"en":"termination","fr":"résiliation","ch":"Ch.19 – Droit des contrats", "tip":"Mettre un terme (fin) au contrat."},
  {"id":618,"en":"time is of the essence","fr":"importance du facteur temps","ch":"Ch.19 – Droit des contrats", "tip":"Le temps est 'de l'essence' = le délai est une condition absolue et stricte."},
  {"id":619,"en":"unconscionable","fr":"léonin","ch":"Ch.19 – Droit des contrats", "tip":"Un contrat tellement déséquilibré qu'il en est 'inconscient' (choquant pour la conscience)."},
  {"id":620,"en":"undue influence","fr":"influence démesurée, manipulation","ch":"Ch.19 – Droit des contrats", "tip":"Influence non-due/abusive sur une personne vulnérable."},
  {"id":621,"en":"void","fr":"annuler, nul","ch":"Ch.19 – Droit des contrats", "tip":"Faux-ami : le contrat est 'vide' d'effets (nul absolu)."},
  {"id":622,"en":"waiver","fr":"renonciation","ch":"Ch.19 – Droit des contrats", "tip":"L'acte de 'waive' (abandonner/renoncer à) un droit."},
  {"id":623,"en":"whereas","fr":"attendu que","ch":"Ch.19 – Droit des contrats", "tip":"Mot très solennel utilisé en cascade au début des contrats (les 'Whereas clauses')."},
  {"id":624,"en":"accountable for","fr":"responsable de","ch":"Ch.20 – Glossaire général", "tip":"Devoir rendre des comptes (accounts) pour ses actes."},
  {"id":625,"en":"act","fr":"loi","ch":"Ch.20 – Glossaire général", "tip":"Un acte du parlement = une loi."},
  {"id":626,"en":"aforesaid","fr":"susdit, susmentionné","ch":"Ch.20 – Glossaire général", "tip":"Dit (said) auparavant (afore)."},
  {"id":627,"en":"appeal","fr":"appel","ch":"Ch.20 – Glossaire général", "tip":"Faire appel (Courts of Appeal)."},
  {"id":628,"en":"artificial person","fr":"personne morale","ch":"Ch.20 – Glossaire général", "tip":"Une personne 'artificielle' créée par la loi (entreprise)."},
  {"id":629,"en":"attorney","fr":"avocat","ch":"Ch.20 – Glossaire général", "tip":"Terme américain générique pour avocat (Attorney at law)."},
  {"id":630,"en":"award","fr":"attribuer, somme attribuée","ch":"Ch.20 – Glossaire général", "tip":"La 'récompense' (somme d'argent) accordée par le juge ou l'arbitre."},
  {"id":631,"en":"carriage","fr":"transport","ch":"Ch.20 – Glossaire général", "tip":"Pense à 'carrosse/carriage' = le transport de marchandises."},
  {"id":632,"en":"bad faith","fr":"mauvaise foi","ch":"Ch.20 – Glossaire général", "tip":"Bad (mauvaise) + faith (foi)."},
  {"id":633,"en":"bequest","fr":"legs","ch":"Ch.20 – Glossaire général", "tip":"Ce qu'on laisse par testament."},
  {"id":634,"en":"bid for a contract","fr":"soumissionner","ch":"Ch.20 – Glossaire général", "tip":"Faire une offre pour remporter un marché public."},
  {"id":635,"en":"bona fide","fr":"réel, de bonne foi","ch":"Ch.20 – Glossaire général", "tip":"Latin pour 'bonne foi'. Très utilisé (ex: a bona fide purchaser)."},
  {"id":636,"en":"burden of proof","fr":"charge de la preuve","ch":"Ch.20 – Glossaire général", "tip":"Le 'fardeau' (burden) de la preuve."},
  {"id":637,"en":"calendar year","fr":"année civile","ch":"Ch.20 – Glossaire général", "tip":"L'année du calendrier (1er jan -> 31 déc)."},
  {"id":638,"en":"case","fr":"cas, affaire","ch":"Ch.20 – Glossaire général", "tip":"Une affaire judiciaire (un cas)."},
  {"id":639,"en":"caveat","fr":"que… se méfie","ch":"Ch.20 – Glossaire général", "tip":"Une mise en garde juridique."},
  {"id":640,"en":"chattel paper","fr":"biens meubles","ch":"Ch.20 – Glossaire général", "tip":"Terme américain (UCC) pour des documents actant une dette sur un bien meuble."},
  {"id":641,"en":"circumstances","fr":"circonstances, situation","ch":"Ch.20 – Glossaire général", "tip":"Transparent."},
  {"id":642,"en":"circumvent","fr":"contourner","ch":"Ch.20 – Glossaire général", "tip":"Pense à une 'circonvolution' : on contourne la loi pour éviter ses effets."},
  {"id":643,"en":"class action","fr":"action de groupe","ch":"Ch.20 – Glossaire général", "tip":"L'action en justice de toute une classe de consommateurs."},
  {"id":644,"en":"collect","fr":"recouvrer","ch":"Ch.20 – Glossaire général", "tip":"Collecter une dette."},
  {"id":645,"en":"compel","fr":"contraindre, obliger","ch":"Ch.20 – Glossaire général", "tip":"La force 'compulsive' = on te force."},
  {"id":646,"en":"compelled to","fr":"obligé de","ch":"Ch.20 – Glossaire général", "tip":"Être obligé de le faire par la loi."},
  {"id":647,"en":"complaint","fr":"plainte","ch":"Ch.20 – Glossaire général", "tip":"Pense à se plaindre (complain)."},
  {"id":648,"en":"completion","fr":"achèvement","ch":"Ch.20 – Glossaire général", "tip":"Quand le deal est complet/terminé."},
  {"id":649,"en":"conceal","fr":"dissimuler","ch":"Ch.20 – Glossaire général", "tip":"Pense au maquillage 'concealer' (anti-cernes) qui dissimule les défauts."},
  {"id":650,"en":"construe","fr":"interpréter","ch":"Ch.20 – Glossaire général", "tip":"Le juge 'construit' le sens d'une clause floue."},
  {"id":651,"en":"contingency","fr":"aléa, éventualité","ch":"Ch.20 – Glossaire général", "tip":"Quelque chose de contingent (incertain)."},
  {"id":652,"en":"contingent on/upon","fr":"lié à, dépendant de","ch":"Ch.20 – Glossaire général", "tip":"La réussite dépend d'un aléa."},
  {"id":653,"en":"court","fr":"tribunal","ch":"Ch.20 – Glossaire général", "tip":"La 'cour' de justice."},
  {"id":654,"en":"covenant","fr":"engagement contractuel","ch":"Ch.20 – Glossaire général", "tip":"Un pacte ou une promesse solennelle dans un contrat (souvent un prêt)."},
  {"id":655,"en":"custom","fr":"usage","ch":"Ch.20 – Glossaire général", "tip":"La coutume commerciale."},
  {"id":656,"en":"customary","fr":"habituel","ch":"Ch.20 – Glossaire général", "tip":"Issu de la coutume/habitude."},
  {"id":657,"en":"deed","fr":"acte notarié","ch":"Ch.20 – Glossaire général", "tip":"Un acte scellé, plus solennel qu'un contrat classique (surtout en droit immobilier US/UK)."},
  {"id":658,"en":"deem","fr":"juger, estimer","ch":"Ch.20 – Glossaire général", "tip":"Très utilisé : 'it is deemed to be...' = 'il est réputé être...'."},
  {"id":659,"en":"deem fit","fr":"estimer approprié","ch":"Ch.20 – Glossaire général", "tip":"Juger que c'est 'fit' (bien ajusté / convenable)."},
  {"id":660,"en":"derogate from","fr":"déroger à","ch":"Ch.20 – Glossaire général", "tip":"Transparent."},
  {"id":661,"en":"disposal","fr":"cession","ch":"Ch.20 – Glossaire général", "tip":"Se 'disposer' (se débarrasser) de ses actions en les vendant."},
  {"id":662,"en":"duly","fr":"dûment","ch":"Ch.20 – Glossaire général", "tip":"'Duly signed' = dûment signé."},
  {"id":663,"en":"encumbrance","fr":"charge hypothécaire","ch":"Ch.20 – Glossaire général", "tip":"Ce qui 'encombre' la propriété d'un bien (ex: une hypothèque dessus)."},
  {"id":664,"en":"enforceable","fr":"exécutoire","ch":"Ch.20 – Glossaire général", "tip":"Qu'on peut forcer judiciairement."},
  {"id":665,"en":"escrow","fr":"tiers dépositaire","ch":"Ch.20 – Glossaire général", "tip":"L'argent est mis sous séquestre chez un tiers de confiance ('in escrow') en attendant la fin de la vente."},
  {"id":666,"en":"escrow agreement","fr":"convention de séquestre","ch":"Ch.20 – Glossaire général", "tip":"Le contrat régissant le dépôt chez le tiers."},
  {"id":667,"en":"exhibit","fr":"pièce à conviction, annexe","ch":"Ch.20 – Glossaire général", "tip":"Dans une cour US : 'Exhibit A' = Pièce à conviction numéro A."},
  {"id":668,"en":"fairness","fr":"équité","ch":"Ch.20 – Glossaire général", "tip":"Le sentiment d'être juste (fair)."},
  {"id":669,"en":"file","fr":"déposer, faire enregistrer","ch":"Ch.20 – Glossaire général", "tip":"Mettre physiquement dans le dossier du greffe."},
  {"id":670,"en":"footnote","fr":"note de bas de page","ch":"Ch.20 – Glossaire général", "tip":"La note (note) au pied (foot) de la page."},
  {"id":671,"en":"forbear","fr":"renoncer","ch":"Ch.20 – Glossaire général", "tip":"S'abstenir de faire valoir un droit (forbearance)."},
  {"id":672,"en":"forfeit","fr":"abandonner","ch":"Ch.20 – Glossaire général", "tip":"Perdre le droit de garder quelque chose suite à une faute (on 'forfait' à son droit)."},
  {"id":673,"en":"forfeiture","fr":"perte, confiscation, déchéance","ch":"Ch.20 – Glossaire général", "tip":"La déchéance du droit (résultat de forfeit)."},
  {"id":674,"en":"forward","fr":"à terme","ch":"Ch.20 – Glossaire général", "tip":"Vers l'avant (dans le futur)."},
  {"id":675,"en":"frivolous","fr":"abusif (procédure abusive)","ch":"Ch.20 – Glossaire général", "tip":"Une plainte frivole (sans aucun fondement sérieux, juste pour embêter)."},
  {"id":676,"en":"grievance","fr":"grief","ch":"Ch.20 – Glossaire général", "tip":"Transparent avec le mot français 'grief'."},
  {"id":677,"en":"ground","fr":"motif","ch":"Ch.20 – Glossaire général", "tip":"Le terrain (ground) sur lequel tu fondes ton argumentaire = le motif légal."},
  {"id":678,"en":"guarantor","fr":"garant","ch":"Ch.20 – Glossaire général", "tip":"Celui qui apporte la garantie."},
  {"id":679,"en":"incentive","fr":"incitation, aide, prime","ch":"Ch.20 – Glossaire général", "tip":"Ce qui motive l'employé à bien travailler."},
  {"id":680,"en":"incur","fr":"subir, encourir","ch":"Ch.20 – Glossaire général", "tip":"Encourir une pénalité financière."},
  {"id":681,"en":"in force","fr":"en vigueur","ch":"Ch.20 – Glossaire général", "tip":"La loi est 'en force' (active)."},
  {"id":682,"en":"in cash","fr":"en numéraire","ch":"Ch.20 – Glossaire général", "tip":"Payer en argent liquide."},
  {"id":683,"en":"in kind","fr":"en nature","ch":"Ch.20 – Glossaire général", "tip":"Payer avec une autre chose ('de même espèce' = kind)."},
  {"id":684,"en":"interference","fr":"ingérence","ch":"Ch.20 – Glossaire général", "tip":"Interférer dans les affaires de l'autre."},
  {"id":685,"en":"joint and several","fr":"solidaire","ch":"Ch.20 – Glossaire général", "tip":"L'obligation conjointe (joint) et solidaire (several = individuelle). Expression technique clé."},
  {"id":686,"en":"judiciary","fr":"judiciaire / la magistrature","ch":"Ch.20 – Glossaire général", "tip":"Transparent."},
  {"id":687,"en":"latent defect","fr":"vice caché","ch":"Ch.20 – Glossaire général", "tip":"Un défaut (defect) qui dort en profondeur (latent) et ne se voit pas à l'œil nu."},
  {"id":688,"en":"leasehold","fr":"droit au bail","ch":"Ch.20 – Glossaire général", "tip":"Droit issu du fait de tenir (hold) un bail (lease)."},
  {"id":689,"en":"lessee","fr":"preneur","ch":"Ch.20 – Glossaire général", "tip":"Celui qui reçoit (-ee) le bail."},
  {"id":690,"en":"lessor","fr":"bailleur","ch":"Ch.20 – Glossaire général", "tip":"Celui qui octroie (-or) le bail."},
  {"id":691,"en":"lien","fr":"privilège, droit de rétention","ch":"Ch.20 – Glossaire général", "tip":"Faux-ami : un lien (US) est une garantie prise sur le bien d'un débiteur (comme un gage)."},
  {"id":692,"en":"loophole","fr":"vide juridique","ch":"Ch.20 – Glossaire général", "tip":"Le 'trou' (hole) dans la boucle (loop) de la loi par lequel on peut s'échapper."},
  {"id":693,"en":"merit","fr":"fondement","ch":"Ch.20 – Glossaire général", "tip":"Juger un cas sur ses 'mérites' (sur le fond du droit et non la procédure)."},
  {"id":694,"en":"mitigate","fr":"atténuer","ch":"Ch.20 – Glossaire général", "tip":"La victime a le devoir de 'mitiger' ses dommages (ne pas laisser la situation s'aggraver)."},
  {"id":695,"en":"moot","fr":"discutable","ch":"Ch.20 – Glossaire général", "tip":"'A moot point' = un point purement académique car le problème s'est déjà résolu de lui-même."},
  {"id":696,"en":"natural person","fr":"personne physique","ch":"Ch.20 – Glossaire général", "tip":"Une personne 'naturelle' (un être humain, l'inverse de l'entreprise morale)."},
  {"id":697,"en":"passing off","fr":"usurpation d'identité","ch":"Ch.20 – Glossaire général", "tip":"Se faire 'passer pour' la marque concurrente pour tromper les clients."},
  {"id":698,"en":"penalty clause","fr":"clause pénale","ch":"Ch.20 – Glossaire général", "tip":"Transparent (clause punissant une partie en retard)."},
  {"id":699,"en":"personalty","fr":"biens meubles","ch":"Ch.20 – Glossaire général", "tip":"Les biens personnels (l'inverse de l'immobilier/realty)."},
  {"id":700,"en":"power of attorney","fr":"procuration","ch":"Ch.20 – Glossaire général", "tip":"Donner le pouvoir d'avocat/de représentant à quelqu'un d'autre (POA)."},
  {"id":701,"en":"preclude","fr":"exclure","ch":"Ch.20 – Glossaire général", "tip":"Empêcher que quelque chose arrive (clore la porte avant)."},
  {"id":702,"en":"principal and agent","fr":"commettant et préposé","ch":"Ch.20 – Glossaire général", "tip":"Le patron (principal) et celui qui agit pour lui (agent) dans le droit des mandats."},
  {"id":703,"en":"prosecute","fr":"poursuivre en justice","ch":"Ch.20 – Glossaire général", "tip":"Le 'prosecutor' est le procureur qui poursuit les criminels."},
  {"id":704,"en":"provide","fr":"stipuler, fournir","ch":"Ch.20 – Glossaire général", "tip":"Le contrat 'fournit' une règle = il la stipule."},
  {"id":705,"en":"provide for","fr":"prévoir","ch":"Ch.20 – Glossaire général", "tip":"Le contrat a 'prévu pour' tel scénario."},
  {"id":706,"en":"provided","fr":"fourni, prévu, à condition que","ch":"Ch.20 – Glossaire général", "tip":"'Provided that...' = Pourvu/à condition que... (très classique)."},
  {"id":707,"en":"proxy","fr":"mandataire, procuration","ch":"Ch.20 – Glossaire général", "tip":"Voter par 'proxy' à l'assemblée = par procuration."},
  {"id":708,"en":"public procurement","fr":"marché public","ch":"Ch.20 – Glossaire général", "tip":"L'action de se procurer des biens pour le public (l'État)."},
  {"id":709,"en":"purport","fr":"signification","ch":"Ch.20 – Glossaire général", "tip":"Le sens apparent d'un document."},
  {"id":710,"en":"qualified","fr":"agréé / avec réserve","ch":"Ch.20 – Glossaire général", "tip":"Une opinion 'qualifiée' d'un auditeur = il émet des réserves sur les comptes."},
  {"id":711,"en":"real estate","fr":"immobilier","ch":"Ch.20 – Glossaire général", "tip":"Les 'vrais' domaines (la terre, les murs)."},
  {"id":712,"en":"realty","fr":"biens immobiliers","ch":"Ch.20 – Glossaire général", "tip":"Abréviation juridique de real estate."},
  {"id":713,"en":"redemption","fr":"rachat, remboursement","ch":"Ch.20 – Glossaire général", "tip":"Se racheter (au sens propre, pour des actions)."},
  {"id":714,"en":"regulations","fr":"règlement","ch":"Ch.20 – Glossaire général", "tip":"Transparent (les règles administratives)."},
  {"id":715,"en":"repeal","fr":"abroger, annuler","ch":"Ch.20 – Glossaire général", "tip":"Faire disparaître une ancienne loi."},
  {"id":716,"en":"requirement","fr":"exigence","ch":"Ch.20 – Glossaire général", "tip":"Ce qui est requis."},
  {"id":717,"en":"return a verdict","fr":"rendre, prononcer un verdict","ch":"Ch.20 – Glossaire général", "tip":"Le jury 'retourne' au juge avec un verdict."},
  {"id":718,"en":"rider","fr":"avenant","ch":"Ch.20 – Glossaire général", "tip":"Le document qui 'chevauche' (ride) par-dessus le contrat principal."},
  {"id":719,"en":"scope","fr":"étendue, portée","ch":"Ch.20 – Glossaire général", "tip":"Pense au microscope/télescope : le champ de vision ou d'action de la loi."},
  {"id":720,"en":"seek redress","fr":"demander réparation","ch":"Ch.20 – Glossaire général", "tip":"Chercher (seek) à 'redresser' un tort qu'on t'a fait."},
  {"id":721,"en":"ship","fr":"expédier","ch":"Ch.20 – Glossaire général", "tip":"Mettre dans un navire (ship) ou expédier (shipping)."},
  {"id":722,"en":"slip","fr":"bordereau","ch":"Ch.20 – Glossaire général", "tip":"Un petit bout de papier (un slip de transaction)."},
  {"id":723,"en":"storage","fr":"entreposage, stockage","ch":"Ch.20 – Glossaire général", "tip":"Où on stocke les choses (store)."},
  {"id":724,"en":"subject to","fr":"sous réserve de / soumis à","ch":"Ch.20 – Glossaire général", "tip":"Un accord 'subject to contract' = il faut encore signer le contrat officiel pour que ça vaille."},
  {"id":725,"en":"suit","fr":"procès, action en justice","ch":"Ch.20 – Glossaire général", "tip":"Abréviation de lawsuit."},
  {"id":726,"en":"sustained","fr":"recevable (argument)","ch":"Ch.20 – Glossaire général", "tip":"Quand un juge crie 'Sustained !' dans les films, il valide l'objection de l'avocat."},
  {"id":727,"en":"tender","fr":"soumission, soumissionner","ch":"Ch.20 – Glossaire général", "tip":"Faire une offre formelle (appel d'offres)."},
  {"id":728,"en":"tenderer","fr":"soumissionnaire","ch":"Ch.20 – Glossaire général", "tip":"L'entreprise qui candidate à l'appel d'offres."},
  {"id":729,"en":"testify","fr":"témoigner, déclarer","ch":"Ch.20 – Glossaire général", "tip":"Faire son témoignage à la barre."},
  {"id":730,"en":"testimony","fr":"témoignage","ch":"Ch.20 – Glossaire général", "tip":"Transparent (le témoignage)."},
  {"id":731,"en":"third party","fr":"tiers","ch":"Ch.20 – Glossaire général", "tip":"La troisième partie (les deux premières étant les signataires)."},
  {"id":732,"en":"trade name","fr":"raison commerciale","ch":"Ch.20 – Glossaire général", "tip":"Le nom sous lequel tu fais du commerce (trade)."},
  {"id":733,"en":"transfer price","fr":"prix de transfert","ch":"Ch.20 – Glossaire général", "tip":"Transparent."},
  {"id":734,"en":"tricky","fr":"délicat, scabreux","ch":"Ch.20 – Glossaire général", "tip":"Un problème 'piégeux' (issu de trick = le piège)."},
  {"id":735,"en":"unavailing","fr":"vain","ch":"Ch.20 – Glossaire général", "tip":"Un argument qui ne sert à rien, qui n'est d'aucune utilité (avail)."},
  {"id":736,"en":"under oath","fr":"sous serment","ch":"Ch.20 – Glossaire général", "tip":"Jurer de dire la vérité devant le juge."},
  {"id":737,"en":"uphold","fr":"confirmer / faire respecter","ch":"Ch.20 – Glossaire général", "tip":"Tenir (hold) vers le haut (up). La cour d'appel 'maintient' la décision du premier juge."},
  {"id":738,"en":"vest","fr":"confier, investir","ch":"Ch.20 – Glossaire général", "tip":"Les pouvoirs sont 'investis' (vested) en la personne du président."},
  {"id":739,"en":"veto","fr":"veto","ch":"Ch.20 – Glossaire général", "tip":"Je m'oppose (latin)."},
  {"id":740,"en":"will","fr":"testament","ch":"Ch.20 – Glossaire général", "tip":"La 'volonté' finale de la personne décédée."},
  {"id":741,"en":"within the scope of","fr":"dans le cadre de","ch":"Ch.20 – Glossaire général", "tip":"À l'intérieur de l'étendue de (scope)."},
  {"id":742,"en":"withhold","fr":"retenir, prélever","ch":"Ch.20 – Glossaire général", "tip":"Refuser de donner quelque chose qu'on tient (hold)."},
  {"id":743,"en":"wrong","fr":"injustice, mal, tort","ch":"Ch.20 – Glossaire général", "tip":"Le fait de faire un 'tort' légal (base du civil law/torts)."}
];

const CHAPTERS = [...new Set(VOCAB.map(w => w.ch))];
const BOX_DAYS = [0, 0, 1, 3, 7, 14];
const SESSION_SIZE = 20;

// --- FONCTIONS UTILITAIRES ---
function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,'').trim();
}

function checkType(input: string, correct: string) {
  const inp = norm(input);
  if (!inp) return 'empty';
  const opts = correct.split(/[,/]/).map(s => norm(s.trim())).filter(Boolean);
  if (opts.some(o => o === inp)) return 'exact';
  if (opts.some(o => o.length > 3 && (o.includes(inp) || inp.includes(o)) && inp.length >= 3)) return 'close';
  return 'wrong';
}

function isDue(entry: any) {
  if (!entry || entry.box === 0) return true;
  const days = BOX_DAYS[Math.min(entry.box, BOX_DAYS.length-1)];
  if (!days) return true;
  return Date.now() >= new Date(entry.lastSeen).getTime() + days * 86400000;
}

function pickMode(box: number) {
  const r = Math.random();
  if (box === 0) return r < 0.5 ? 'flashcard' : r < 0.8 ? 'qcm' : 'type';
  if (box <= 2) return r < 0.25 ? 'flashcard' : r < 0.65 ? 'qcm' : 'type';
  return r < 0.1 ? 'flashcard' : r < 0.5 ? 'qcm' : 'type';
}

function getQcmOptions(word: any, pool: any[]) {
  const wrong = pool.filter(w => w.id !== word.id).sort(() => Math.random()-0.5).slice(0,3).map(w => w.fr);
  return [word.fr, ...wrong].sort(() => Math.random()-0.5);
}

function buildSession(progress: any, chapters: any[], missedOnly: boolean) {
  let pool = chapters.length > 0 ? VOCAB.filter(w => chapters.includes(w.ch)) : VOCAB;
  if (missedOnly) pool = pool.filter(w => progress[w.id]?.wrong > 0);
  if (pool.length === 0) return [];
  const due = pool.filter(w => isDue(progress[w.id])).sort((a,b) => {
    const pa = progress[a.id] || {box:0}; const pb = progress[b.id] || {box:0};
    if (pa.box !== pb.box) return pa.box - pb.box;
    return (pa.lastSeen ? new Date(pa.lastSeen).getTime() : 0) - (pb.lastSeen ? new Date(pb.lastSeen).getTime() : 0);
  });
  const selected = due.slice(0, SESSION_SIZE);
  if (selected.length < SESSION_SIZE) {
    const notDue = pool.filter(w => !isDue(progress[w.id])).sort(() => Math.random()-0.5);
    selected.push(...notDue.slice(0, SESSION_SIZE - selected.length));
  }
  const qcmPool = pool.length >= 4 ? pool : VOCAB;
  return selected.map(w => ({ word: w, mode: pickMode((progress[w.id]||{}).box||0), options: getQcmOptions(w, qcmPool) }));
}

function xpToLevel(xp: number) { return Math.floor(xp / 500) + 1; }

// --- COMPOSANT ASTUCE ---
function TipDisplay({ tip }: { tip?: string }) {
  if (!tip) return null;
  return (
    <div style={{marginTop: '16px', padding: '12px', background: 'rgba(252,211,77,0.1)', border: '1px solid rgba(252,211,77,0.3)', borderRadius: '8px', fontSize: '0.85rem', color: '#fcd34d', fontStyle: 'italic', textAlign: 'center'}}>
      💡 Astuce : {tip}
    </div>
  );
}

// --- COMPOSANT EASTER EGG ---
function RandomEasterEgg({ idx }: { idx: number }) {
  const [egg, setEgg] = useState<{top: number, left: number, rot: number} | null>(null);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('egg_count') || '0');
    if (count >= 2) return;

    // 1% de chance d'apparition
    if (Math.random() < 0.01) {
      localStorage.setItem('egg_count', (count + 1).toString());
      const top = 15 + Math.random() * 50;  
      const left = 10 + Math.random() * 50; 
      const rot = -15 + Math.random() * 30; 
      setEgg({ top, left, rot });

      const timer = setTimeout(() => setEgg(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [idx]);

  if (!egg) return null;

  return (
    <div style={{
      position: 'fixed',
      top: `${egg.top}%`,
      left: `${egg.left}%`,
      transform: `rotate(${egg.rot}deg)`,
      zIndex: 9999,
      pointerEvents: 'none',
      background: '#1e293b',
      padding: '10px',
      borderRadius: '16px',
      border: '3px solid #fcd34d',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      textAlign: 'center',
      animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      <img src="/juriste-legendaire.png" alt="Surprise" style={{ width: '150px', borderRadius: '8px', objectFit: 'cover' }} />
      <div style={{ fontSize: '0.9rem', color: '#fcd34d', fontWeight: 'bold', marginTop: '8px' }}>
        Ne lâche rien ! ⚖️
      </div>
    </div>
  );
}

// --- APP PRINCIPALE ---
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState<any>({});
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [lastDate, setLastDate] = useState('');
  const [screen, setScreen] = useState('home');
  const [selCh, setSelCh] = useState<string[]>([]);
  const [session, setSession] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [sessXP, setSessXP] = useState(0);
  const [missedMode, setMissedMode] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [selOpt, setSelOpt] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [typeRes, setTypeRes] = useState<any>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    function load() {
      try {
        const r1 = localStorage.getItem('vp2'); if (r1) setProgress(JSON.parse(r1));
        const r2 = localStorage.getItem('vstreak2'); if (r2) setStreak(parseInt(r2)||0);
        const r3 = localStorage.getItem('vxp2'); if (r3) setXp(parseInt(r3)||0);
        const r4 = localStorage.getItem('vdate2'); if (r4) setLastDate(r4);
      } catch {}
      setLoaded(true);
    }
    load();
  }, []);

  function persist(p: any, s: number, x: number, d: string) {
    try {
      localStorage.setItem('vp2', JSON.stringify(p));
      localStorage.setItem('vstreak2', String(s));
      localStorage.setItem('vxp2', String(x));
      localStorage.setItem('vdate2', d);
    } catch {}
  }

  function handleReset() {
    if(window.confirm("⚠️ Es-tu sûr de vouloir effacer TOUTE ta progression ?")) {
      localStorage.clear();
      window.location.reload();
    }
  }

  const stats = {
    total: VOCAB.length,
    new: VOCAB.filter(w => !progress[w.id]).length,
    learning: Object.values(progress).filter((p: any) => p.box > 0 && p.box < 5).length,
    mastered: Object.values(progress).filter((p: any) => p.box >= 5).length,
    due: VOCAB.filter(w => isDue(progress[w.id])).length,
    missed: VOCAB.filter(w => progress[w.id]?.wrong > 0).length,
  };

  function startSession(missed = false) {
    const sess = buildSession(progress, selCh, missed);
    if (sess.length === 0) return;
    setSession(sess); setIdx(0); setResults([]); setSessXP(0); setMissedMode(missed);
    setRevealed(false); setSelOpt(null); setTyped(''); setTypeRes(null); setAnswered(false);
    setScreen('quiz');
    const today = new Date().toDateString();
    if (lastDate !== today) {
      const yest = new Date(Date.now()-86400000).toDateString();
      const ns = lastDate === yest ? streak + 1 : 1;
      setStreak(ns); setLastDate(today);
      persist(progress, ns, xp, today);
    }
  }

  function updateWord(wordId: number, box: number, correct: boolean) {
    const cur = progress[wordId] || {box:0, correct:0, wrong:0};
    const nouveauxRates = correct ? 0 : cur.wrong + 1;
    const np = { ...progress, [wordId]: { box, lastSeen: new Date().toISOString(), correct: cur.correct + (correct?1:0), wrong: nouveauxRates }};
    setProgress(np);
    return np;
  }

  if (!loaded) return <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Chargement...</div>;

  if (screen==='home') return <Home stats={stats} streak={streak} xp={xp} selCh={selCh} setSelCh={setSelCh} onStart={()=>startSession(false)} onMissed={()=>startSession(true)} onReset={handleReset} />;
  
  if (screen==='quiz') {
    const item = session[idx];
    return <Quiz 
      item={item} idx={idx} total={session.length} sessXP={sessXP}
      progress={progress} setProgress={setProgress} xp={xp} setXp={setXp} setSessXP={setSessXP}
      streak={streak} lastDate={lastDate} persist={persist} updateWord={updateWord}
      setResults={setResults} setScreen={setScreen} setIdx={setIdx}
      revealed={revealed} setRevealed={setRevealed}
      selOpt={selOpt} setSelOpt={setSelOpt}
      answered={answered} setAnswered={setAnswered}
      typed={typed} setTyped={setTyped}
      typeRes={typeRes} setTypeRes={setTypeRes}
    />;
  }

  if (screen==='results') return <Results results={results} correct={results.filter(r=>r.correct).length} total={results.length} sessXP={sessXP} streak={streak} xp={xp} progress={progress} onHome={()=>setScreen('home')} onRestart={()=>startSession(missedMode)} />;
  return null;
}

// ─── SOUS-COMPOSANTS ─────────────────────────────────────────────────────────

function Home({ stats, streak, xp, selCh, setSelCh, onStart, onMissed, onReset }: any) {
  const [showCh, setShowCh] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const examDate = new Date("2026-04-09T13:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = examDate - now;
      if (diff <= 0) { setTimeLeft("C'est l'heure du partiel ! ⚖️"); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`⏳ Partiel dans : ${days}j ${hours}h ${mins}m`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const level = xpToLevel(xp);
  const xpIn = xp % 500;

  return (
    <div style={{minHeight:'100vh',background:'#0f172a',color:'white',padding:'16px',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={{textAlign:'center',paddingTop:'16px',marginBottom:'24px'}}>
          <div style={{fontSize:'2rem',fontWeight:'800',color:'#818cf8',letterSpacing:'-0.5px'}}>⚖️ Legal Vocab</div>
          <div style={{color:'#64748b',fontSize:'0.85rem',marginTop:'4px'}}>Anglais du droit des affaires • {stats.total} mots</div>
          
          <div style={{marginTop:'12px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#fca5a5', padding:'8px 16px', borderRadius:'20px', display:'inline-block', fontWeight:'600', fontSize:'0.9rem'}}>
            {timeLeft}
          </div>
        </div>

        <div style={{background:'#1e293b',borderRadius:'16px',padding:'16px',marginBottom:'12px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'42px',height:'42px',background:'#4f46e5',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'800',fontSize:'1.1rem'}}>{level}</div>
              <div>
                <div style={{fontWeight:'600',fontSize:'0.95rem'}}>Niveau {level}</div>
                <div style={{color:'#64748b',fontSize:'0.75rem'}}>{xp} XP au total</div>
              </div>
            </div>
            <div style={{background:'rgba(234,88,12,0.2)',border:'1px solid rgba(234,88,12,0.3)',borderRadius:'20px',padding:'6px 12px',display:'flex',alignItems:'center',gap:'4px'}}>
              <span style={{fontSize:'1rem'}}>🔥</span>
              <span style={{fontWeight:'700',color:'#fb923c'}}>{streak}</span>
              <span style={{fontSize:'0.72rem',color:'#f97316'}}>jours</span>
            </div>
          </div>
          <div style={{height:'6px',background:'#334155',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,#6366f1,#818cf8)',borderRadius:'4px',width:`${(xpIn/500)*100}%`,transition:'width 0.5s'}} />
          </div>
          <div style={{fontSize:'0.7rem',color:'#475569',marginTop:'4px'}}>{xpIn}/500 XP → niveau {level+1}</div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px',marginBottom:'12px'}}>
          {[['Total',stats.total,'#94a3b8'],['Nouveaux',stats.new,'#60a5fa'],['En cours',stats.learning,'#fbbf24'],['Maîtrisés',stats.mastered,'#34d399']].map(([label,val,color])=>(
            <div key={label as string} style={{background:'#1e293b',borderRadius:'12px',padding:'12px 8px',textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',fontWeight:'800',color: color as string}}>{val as number}</div>
              <div style={{fontSize:'0.65rem',color:'#64748b',marginTop:'2px'}}>{label as string}</div>
            </div>
          ))}
        </div>

        <div style={{background:'#1e293b',borderRadius:'12px',padding:'12px',marginBottom:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'#64748b',marginBottom:'6px'}}>
            <span>Progression</span><span>{Math.round((stats.mastered/stats.total)*100)}%</span>
          </div>
          <div style={{height:'10px',background:'#334155',borderRadius:'6px',overflow:'hidden',display:'flex'}}>
            <div style={{background:'#10b981',width:`${(stats.mastered/stats.total)*100}%`}} />
            <div style={{background:'#f59e0b',width:`${(stats.learning/stats.total)*100}%`}} />
          </div>
        </div>

        <div style={{background:'#1e293b',borderRadius:'12px',padding:'12px',marginBottom:'16px'}}>
          <button onClick={()=>setShowCh((v:boolean)=>!v)} style={{width:'100%',background:'none',border:'none',color:'white',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',padding:'0',fontSize:'0.875rem',fontWeight:'500'}}>
            <span>🗂 Chapitres {selCh.length>0?`(${selCh.length} sélectionnés)`:'(tous)'}</span>
            <span style={{color:'#64748b'}}>{showCh?'▲':'▼'}</span>
          </button>
          {showCh && (
            <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'6px',maxHeight:'260px',overflowY:'auto'}}>
              {CHAPTERS.map((ch: any) => (
                <label key={ch} style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
                  <div onClick={()=>setSelCh((prev: any)=>prev.includes(ch)?prev.filter((c: any)=>c!==ch):[...prev,ch])}
                    style={{width:'18px',height:'18px',borderRadius:'4px',border:`2px solid ${selCh.includes(ch)?'#6366f1':'#475569'}`,background:selCh.includes(ch)?'#6366f1':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:'0',cursor:'pointer',transition:'all 0.15s'}}>
                    {selCh.includes(ch)&&<span style={{color:'white',fontSize:'0.6rem',fontWeight:'700'}}>✓</span>}
                  </div>
                  <span onClick={()=>setSelCh((prev: any)=>prev.includes(ch)?prev.filter((c: any)=>c!==ch):[...prev,ch])} style={{fontSize:'0.8rem',color:'#cbd5e1'}}>{ch}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <button onClick={onStart} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'700',padding:'16px',borderRadius:'16px',fontSize:'1rem',cursor:'pointer',marginBottom:'10px',transition:'opacity 0.15s'}}
          onMouseEnter={(e: any)=>e.target.style.opacity='0.9'} onMouseLeave={(e: any)=>e.target.style.opacity='1'}>
          🚀 Démarrer une session
          <div style={{fontSize:'0.8rem',fontWeight:'400',opacity:'0.8',marginTop:'2px'}}>{stats.due} mots à réviser</div>
        </button>
        {stats.missed > 0 && (
          <button onClick={onMissed} style={{width:'100%',background:'rgba(127,29,29,0.6)',border:'1px solid rgba(239,68,68,0.3)',color:'#fca5a5',fontWeight:'600',padding:'12px',borderRadius:'14px',fontSize:'0.9rem',cursor:'pointer',transition:'background 0.15s',marginBottom:'20px'}}
            onMouseEnter={(e: any)=>e.target.style.background='rgba(153,27,27,0.7)'} onMouseLeave={(e: any)=>e.target.style.background='rgba(127,29,29,0.6)'}>
            💪 Réviser les mots ratés ({stats.missed})
          </button>
        )}

        <div style={{textAlign:'center', marginTop:'30px'}}>
          <button onClick={onReset} style={{background:'none', border:'none', color:'#475569', fontSize:'0.75rem', textDecoration:'underline', cursor:'pointer'}}>
            Réinitialiser ma progression
          </button>
        </div>
      </div>
    </div>
  );
}

function Quiz({ item, idx, total, sessXP, progress, setProgress, xp, setXp, setSessXP, streak, lastDate, persist, updateWord, setResults, setScreen, setIdx, revealed, setRevealed, selOpt, setSelOpt, answered, setAnswered, typed, setTyped, typeRes, setTypeRes }: any) {
  const { word, mode, options } = item;
  const modeLabel: any = {flashcard:'🃏 Flashcard', qcm:'🎯 QCM', type:'✍️ Écriture'}[mode as string];
  const pct = ((idx+1)/total)*100;
  
  // Mémorise la boîte avant l'erreur pour pouvoir l'annuler
  const [prevBox, setPrevBox] = useState(0);

  const goNext = () => {
    const ni = idx + 1; 
    if (ni >= total) setScreen('results'); 
    else { setIdx(ni); setRevealed(false); setSelOpt(null); setTyped(''); setTypeRes(null); setAnswered(false); }
  };

  const handleRate = (r:string) => {
    const w = item.word;
    const cur = progress[w.id] || {box:0};
    const box = r==='easy' ? Math.min(cur.box+2,5) : r==='hard' ? Math.min(cur.box+1,5) : 0;
    const earned = r==='easy'?10:r==='hard'?5:0;
    const np = updateWord(w.id, box, r!=='wrong');
    const nx = xp + earned; setXp(nx); setSessXP((s: number) => s+earned);
    setResults((res: any) => [...res, {wordId:w.id, correct:r!=='wrong', earned}]);
    persist(np, streak, nx, lastDate);
    goNext();
  };

  const handleQCM = (opt:string) => {
    if (answered) return;
    const w = item.word; const correct = opt === w.fr;
    const cur = progress[w.id] || {box:0}; const box = correct ? Math.min(cur.box+1,5) : 0;
    const earned = correct ? 15 : 0; const np = updateWord(w.id, box, correct);
    const nx = xp+earned; setXp(nx); setSessXP((s: number) => s+earned);
    setSelOpt(opt); setAnswered(true); setResults((res: any) => [...res, {wordId:w.id, correct, earned}]); 
    persist(np, streak, nx, lastDate);
  };

  const handleType = () => {
    if (answered || !typed.trim()) return;
    const w = item.word; const res = checkType(typed, w.fr);
    const correct = res==='exact'||res==='close';
    const cur = progress[w.id] || {box:0}; 
    setPrevBox(cur.box); 
    const box = res==='exact' ? Math.min(cur.box+1,5) : res==='close' ? cur.box : 0;
    const earned = res==='exact'?20:res==='close'?10:0;
    const np = updateWord(w.id, box, correct); 
    const nx = xp+earned; setXp(nx); setSessXP((s: number) => s+earned);
    setTypeRes(res); setAnswered(true); setResults((r: any) => [...r, {wordId:w.id, correct, earned}]); 
    persist(np, streak, nx, lastDate);
  };

  // La fameuse fonction "J'avais raison !"
  const handleOverride = () => {
    const w = item.word;
    const currentProgress = progress[w.id]; 
    const box = Math.min(prevBox + 1, 5); // On lui donne la victoire (la boîte + 1)
    
    // On calcule l'XP qui manquait (20 si on avait 0, 10 si on avait déjà 10)
    const xpDiff = typeRes === 'wrong' ? 20 : (typeRes === 'close' ? 10 : 0);
    
    // On répare ses statistiques pour ne pas le pénaliser !
    const wasClose = typeRes === 'close';
    const newCorrect = wasClose ? currentProgress.correct : currentProgress.correct + 1;
    const newWrong = wasClose ? currentProgress.wrong : Math.max(0, currentProgress.wrong - 1);
    
    const np = { ...progress, [w.id]: { box, lastSeen: new Date().toISOString(), correct: newCorrect, wrong: newWrong }};
    setProgress(np);
    
    const nx = xp + xpDiff; 
    setXp(nx); 
    setSessXP((s: number) => s + xpDiff);
    
    // On efface l'erreur des résultats de la session en cours
    setResults((r: any) => {
        const arr = [...r];
        arr[arr.length - 1] = { wordId: w.id, correct: true, earned: 20 };
        return arr;
    });
    
    persist(np, streak, nx, lastDate);
    goNext();
  };

  return (
    <div style={{minHeight:'100vh',background:'#0f172a',color:'white',padding:'16px',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column'}}>
      <RandomEasterEgg idx={idx} />
      <div style={{maxWidth:'480px',margin:'0 auto',width:'100%',flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <button onClick={()=>setScreen('home')} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:'0.85rem',padding:'4px'}}>✕ Quitter</button>
          <span style={{background:'rgba(99,102,241,0.15)',border:'1px solid rgba(99,102,241,0.3)',color:'#a5b4fc',borderRadius:'20px',padding:'4px 12px',fontSize:'0.8rem',fontWeight:'500'}}>{modeLabel}</span>
          <span style={{color:'#fbbf24',fontWeight:'700',fontSize:'0.9rem'}}>⚡ {sessXP} XP</span>
        </div>
        <div style={{marginBottom:'8px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'#64748b',marginBottom:'4px'}}>
            <span>{idx+1} / {total}</span><span>{Math.round(pct)}%</span>
          </div>
          <div style={{height:'4px',background:'#1e293b',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,#6366f1,#818cf8)',width:`${pct}%`,transition:'width 0.3s',borderRadius:'4px'}} />
          </div>
        </div>
        <div style={{textAlign:'center',fontSize:'0.72rem',color:'#475569',marginBottom:'12px'}}>{word.ch}</div>
        <div style={{background:'linear-gradient(135deg,#1e293b,#0f1f35)',border:'1px solid #334155',borderRadius:'20px',padding:'32px 24px',textAlign:'center',marginBottom:'16px'}}>
          <div style={{fontSize:'1.8rem',fontWeight:'800',letterSpacing:'-0.5px'}}>{word.en}</div>
        </div>
        
        {mode==='flashcard' && <FlashCard word={word} revealed={revealed} onReveal={()=>setRevealed(true)} onRate={handleRate} />}
        {mode==='qcm' && <QCM word={word} options={options} selOpt={selOpt} answered={answered} onAnswer={handleQCM} onNext={goNext} />}
        {mode==='type' && <Type word={word} typed={typed} setTyped={setTyped} typeRes={typeRes} answered={answered} onSubmit={handleType} onOverride={handleOverride} onNext={goNext} />}
      </div>
    </div>
  );
}

function FlashCard({ word, revealed, onReveal, onRate }: any) {
  return (
    <div>
      <div onClick={!revealed?onReveal:undefined}
        style={{background:'#1e293b',border:`1px solid ${revealed?'#10b981':'#334155'}`,borderRadius:'16px',padding:'28px 24px',textAlign:'center',minHeight:'80px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'16px',cursor:revealed?'default':'pointer',transition:'all 0.2s'}}>
        {revealed
          ? <div style={{fontSize:'1.3rem',fontWeight:'600',color:'#6ee7b7'}}>{word.fr}</div>
          : <div style={{color:'#475569',fontSize:'0.9rem'}}>Touche pour révéler 👇</div>}
      </div>
      {revealed && (
        <>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
            {[['✗ Raté','wrong','rgba(127,29,29,0.5)','#fca5a5','rgba(153,27,27,0.7)'],
              ['~ Difficile','hard','rgba(120,53,15,0.5)','#fcd34d','rgba(146,64,14,0.7)'],
              ['✓ Facile','easy','rgba(6,78,59,0.5)','#6ee7b7','rgba(4,120,87,0.7)']].map(([label,rating,bg,color,hbg])=>(
              <button key={rating} onClick={()=>onRate(rating)}
                style={{background:bg,border:`1px solid ${color}30`,color,fontWeight:'600',padding:'12px 8px',borderRadius:'12px',cursor:'pointer',fontSize:'0.85rem',transition:'background 0.15s'}}
                onMouseEnter={(e: any)=>e.target.style.background=hbg} onMouseLeave={(e: any)=>e.target.style.background=bg}>{label}</button>
            ))}
          </div>
          <TipDisplay tip={word.tip} />
        </>
      )}
    </div>
  );
}

function QCM({ word, options, selOpt, answered, onAnswer, onNext }: any) {
  function style(opt: string) {
    if (!answered) return {background:'#1e293b',border:'1px solid #334155',color:'white',cursor:'pointer'};
    if (opt===word.fr) return {background:'rgba(6,78,59,0.5)',border:'2px solid #10b981',color:'#6ee7b7',cursor:'default'};
    if (opt===selOpt) return {background:'rgba(127,29,29,0.5)',border:'2px solid #ef4444',color:'#fca5a5',cursor:'default'};
    return {background:'#1e293b',border:'1px solid #1e293b',color:'#475569',cursor:'default'};
  }
  return (
    <div>
      <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
        {options.map((opt: any,i: number)=>(
          <button key={i} onClick={()=>onAnswer(opt)} style={{...style(opt),textAlign:'left',padding:'14px 16px',borderRadius:'12px',fontSize:'0.875rem',width:'100%',transition:'all 0.15s'}}>
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <>
          <TipDisplay tip={word.tip} />
          <button onClick={onNext} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'600',padding:'14px',borderRadius:'12px',cursor:'pointer',fontSize:'0.9rem',marginTop:'15px'}}>Suivant →</button>
        </>
      )}
    </div>
  );
}

function Type({ word, typed, setTyped, typeRes, answered, onSubmit, onOverride, onNext }: any) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (!answered && ref.current) ref.current.focus(); }, [answered]);

  const resStyle: any = {exact:{color:'#6ee7b7',msg:'✓ Parfait !',showAns:false},close:{color:'#fcd34d',msg:'~ Presque !',showAns:true},wrong:{color:'#fca5a5',msg:'✗ Raté.',showAns:true}};
  const r = typeRes ? resStyle[typeRes] : null;

  return (
    <div>
      <input ref={ref} value={typed} onChange={e=>!answered&&setTyped(e.target.value)}
        onKeyDown={e=>{if(e.key==='Enter'){if(!answered)onSubmit();else onNext();}}}
        disabled={answered} placeholder="Traduction en français..."
        style={{width:'100%',background:'#1e293b',border:'1px solid #334155',color:'white',padding:'14px 16px',borderRadius:'12px',fontSize:'0.9rem',outline:'none',marginBottom:'12px',boxSizing:'border-box',opacity:answered?0.7:1}} />
      
      {r && (
        <div style={{textAlign:'center',marginBottom:'12px',color:r.color}}>
          <div style={{fontWeight:'600',fontSize:'1rem'}}>{r.msg}</div>
          {r.showAns && <div style={{fontSize:'1.1rem',fontWeight:'700',marginTop:'4px'}}>{word.fr}</div>}
          <TipDisplay tip={word.tip} />
        </div>
      )}

      {!answered ? (
        <button onClick={onSubmit} disabled={!typed.trim()} style={{width:'100%',background:typed.trim()?'linear-gradient(135deg,#4f46e5,#7c3aed)':'#1e293b',border:'none',color:typed.trim()?'white':'#475569',fontWeight:'600',padding:'14px',borderRadius:'12px',cursor:typed.trim()?'pointer':'not-allowed',fontSize:'0.9rem',transition:'all 0.15s'}}>
          Valider
        </button>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'15px'}}>
          <button onClick={onNext} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'600',padding:'14px',borderRadius:'12px',cursor:'pointer',fontSize:'0.9rem'}}>
            Suivant →
          </button>
          
          {/* LE VOILÀ TON BOUTON SAUVEUR DE FAUTES DE FRAPPE ! */}
          {typeRes !== 'exact' && (
            <button onClick={onOverride} style={{width:'100%',background:'transparent',border:'1px solid #475569',color:'#94a3b8',fontWeight:'500',padding:'10px',borderRadius:'12px',cursor:'pointer',fontSize:'0.8rem',transition:'background 0.2s'}}
              onMouseEnter={(e: any)=>e.target.style.background='rgba(71,85,105,0.2)'} onMouseLeave={(e: any)=>e.target.style.background='transparent'}>
              😅 Faute de frappe, j'avais raison !
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Results({ results, correct, total, sessXP, streak, xp, progress, onHome, onRestart }: any) {
  const pct = total > 0 ? Math.round((correct/total)*100) : 0;
  const emoji = pct>=80?'🎉':pct>=50?'💪':'📚';
  const missed = results.filter((r: any)=>!r.correct).map((r: any)=>VOCAB.find(w=>w.id===r.wordId)).filter(Boolean);

  return (
    <div style={{minHeight:'100vh',background:'#0f172a',color:'white',padding:'16px',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
      <div style={{textAlign:'center',paddingTop:'32px',marginBottom:'24px'}}>
          <div style={{fontSize:'4rem',marginBottom:'8px'}}>{emoji}</div>
          
          {/* 👇 LA PHOTO DE FIN DE SESSION EST ICI 👇 */}
          <img 
            src="/fin-session.png" 
            alt="Fin de session" 
            style={{ 
              width: '120px', 
              height: '120px', 
              objectFit: 'cover', 
              borderRadius: '50%', 
              border: '4px solid #818cf8', 
              marginBottom: '16px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
            }} 
          />
          {/* 👆 FIN DE LA PHOTO 👆 */}

          <h2 style={{fontSize:'1.5rem',fontWeight:'800',margin:'0 0 4px'}}>Session terminée !</h2>
          <div style={{fontSize:'3rem',fontWeight:'800',color:'#818cf8'}}>{pct}%</div>
          <div style={{color:'#64748b'}}>{correct}/{total} correctes</div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px',marginBottom:'16px'}}>
          {[[`+${sessXP}`,'XP gagné','#fbbf24'],[`🔥${streak}`,'Jours','#fb923c'],[`${xp}`,'XP total','#818cf8']].map(([val,label,color])=>(
            <div key={label} style={{background:'#1e293b',borderRadius:'12px',padding:'14px 8px',textAlign:'center'}}>
              <div style={{fontSize:'1.4rem',fontWeight:'800',color}}>{val}</div>
              <div style={{fontSize:'0.68rem',color:'#64748b',marginTop:'2px'}}>{label}</div>
            </div>
          ))}
        </div>

        {missed.length > 0 && (
          <div style={{background:'#1e293b',borderRadius:'12px',padding:'14px',marginBottom:'16px'}}>
            <div style={{fontSize:'0.8rem',fontWeight:'600',color:'#f87171',marginBottom:'10px'}}>❌ Mots ratés ({missed.length})</div>
            <div style={{display:'flex',flexDirection:'column',gap:'6px',maxHeight:'180px',overflowY:'auto'}}>
              {missed.map((w: any)=>(
                <div key={w.id} style={{display:'flex',justifyContent:'space-between',fontSize:'0.82rem',padding:'4px 0',borderBottom:'1px solid #334155'}}>
                  <span style={{fontWeight:'600'}}>{w.en}</span>
                  <span style={{color:'#64748b'}}>{w.fr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <button onClick={onRestart} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'700',padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'0.95rem'}}>⏩️ Continuer</button>
          <button onClick={onHome} style={{width:'100%',background:'#1e293b',border:'1px solid #334155',color:'white',fontWeight:'600',padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'0.95rem'}}>🏠 Retour</button>
        </div>
      </div>
    </div>
  );
}