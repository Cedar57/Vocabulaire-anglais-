import { useState, useEffect, useRef } from "react";

const VOCAB = [{"id":0,"en":"academic","fr":"universitaire","ch":"Ch.1 – Mots essentiels"},{"id":1,"en":"actual","fr":"réel, véritable","ch":"Ch.1 – Mots essentiels"},{"id":2,"en":"allotment","fr":"attribution, distribution","ch":"Ch.1 – Mots essentiels"},{"id":3,"en":"amount","fr":"montant","ch":"Ch.1 – Mots essentiels"},{"id":4,"en":"applicant","fr":"candidat","ch":"Ch.1 – Mots essentiels"},{"id":5,"en":"appoint","fr":"nommer","ch":"Ch.1 – Mots essentiels"},{"id":6,"en":"average","fr":"moyen, moyenne","ch":"Ch.1 – Mots essentiels"},{"id":7,"en":"ban","fr":"interdit(adj), interdire(v)","ch":"Ch.1 – Mots essentiels"},{"id":8,"en":"bill","fr":"facture, projet de loi","ch":"Ch.1 – Mots essentiels"},{"id":9,"en":"body","fr":"organisme","ch":"Ch.1 – Mots essentiels"},{"id":10,"en":"blueprint","fr":"projet","ch":"Ch.1 – Mots essentiels"},{"id":11,"en":"borrow (from)","fr":"emprunter (à)","ch":"Ch.1 – Mots essentiels"},{"id":12,"en":"calculation","fr":"calcul","ch":"Ch.1 – Mots essentiels"},{"id":13,"en":"cancel","fr":"annuler","ch":"Ch.1 – Mots essentiels"},{"id":14,"en":"carry out","fr":"effectuer","ch":"Ch.1 – Mots essentiels"},{"id":15,"en":"ceiling","fr":"plafond","ch":"Ch.1 – Mots essentiels"},{"id":16,"en":"compulsory","fr":"obligatoire","ch":"Ch.1 – Mots essentiels"},{"id":17,"en":"consist of","fr":"être composé de","ch":"Ch.1 – Mots essentiels"},{"id":18,"en":"consumption","fr":"consommation","ch":"Ch.1 – Mots essentiels"},{"id":19,"en":"contractor","fr":"entrepreneur / partie contractante","ch":"Ch.1 – Mots essentiels"},{"id":20,"en":"convenient","fr":"pratique","ch":"Ch.1 – Mots essentiels"},{"id":21,"en":"core business","fr":"coeur de métier","ch":"Ch.1 – Mots essentiels"},{"id":22,"en":"current","fr":"courant, actuel","ch":"Ch.1 – Mots essentiels"},{"id":23,"en":"dealer","fr":"concessionnaire, distributeur","ch":"Ch.1 – Mots essentiels"},{"id":24,"en":"draft","fr":"rédiger, brouillon","ch":"Ch.1 – Mots essentiels"},{"id":25,"en":"drawback","fr":"inconvénient","ch":"Ch.1 – Mots essentiels"},{"id":26,"en":"entail","fr":"entrainer","ch":"Ch.1 – Mots essentiels"},{"id":27,"en":"expenditure","fr":"dépense","ch":"Ch.1 – Mots essentiels"},{"id":28,"en":"forecast","fr":"prévision","ch":"Ch.1 – Mots essentiels"},{"id":29,"en":"fund","fr":"fonds","ch":"Ch.1 – Mots essentiels"},{"id":30,"en":"go bankrupt","fr":"faire faillite","ch":"Ch.1 – Mots essentiels"},{"id":31,"en":"grant","fr":"accorder, garantir, subvention","ch":"Ch.1 – Mots essentiels"},{"id":32,"en":"hold","fr":"détenir / statuer","ch":"Ch.1 – Mots essentiels"},{"id":33,"en":"insurance","fr":"assurance","ch":"Ch.1 – Mots essentiels"},{"id":34,"en":"investment","fr":"investissement, placement","ch":"Ch.1 – Mots essentiels"},{"id":35,"en":"lack","fr":"manque, manquer de","ch":"Ch.1 – Mots essentiels"},{"id":36,"en":"leeway","fr":"marge de manœuvre","ch":"Ch.1 – Mots essentiels"},{"id":37,"en":"manage","fr":"diriger, gérer, réussir","ch":"Ch.1 – Mots essentiels"},{"id":38,"en":"mandatory","fr":"obligatoire","ch":"Ch.1 – Mots essentiels"},{"id":39,"en":"market share","fr":"part(s) de marché","ch":"Ch.1 – Mots essentiels"},{"id":40,"en":"memorandum","fr":"note de service","ch":"Ch.1 – Mots essentiels"},{"id":41,"en":"minus","fr":"moins","ch":"Ch.1 – Mots essentiels"},{"id":42,"en":"monies","fr":"sommes d'argent","ch":"Ch.1 – Mots essentiels"},{"id":43,"en":"means","fr":"moyen","ch":"Ch.1 – Mots essentiels"},{"id":44,"en":"notice","fr":"avis, préavis, convocation","ch":"Ch.1 – Mots essentiels"},{"id":45,"en":"outsource","fr":"externaliser","ch":"Ch.1 – Mots essentiels"},{"id":46,"en":"paperwork","fr":"tâche administrative, formalités","ch":"Ch.1 – Mots essentiels"},{"id":47,"en":"poll","fr":"vote","ch":"Ch.1 – Mots essentiels"},{"id":48,"en":"procurement","fr":"contrat public","ch":"Ch.1 – Mots essentiels"},{"id":49,"en":"range","fr":"gamme","ch":"Ch.1 – Mots essentiels"},{"id":50,"en":"ratio","fr":"ratio","ch":"Ch.1 – Mots essentiels"},{"id":51,"en":"record","fr":"enregistrer, archive","ch":"Ch.1 – Mots essentiels"},{"id":52,"en":"red tape","fr":"paperasserie, bureaucratie","ch":"Ch.1 – Mots essentiels"},{"id":53,"en":"relevant","fr":"pertinent, applicable","ch":"Ch.1 – Mots essentiels"},{"id":54,"en":"resign","fr":"démissionner","ch":"Ch.1 – Mots essentiels"},{"id":55,"en":"resignation","fr":"démission","ch":"Ch.1 – Mots essentiels"},{"id":56,"en":"rule","fr":"règle, règlement","ch":"Ch.1 – Mots essentiels"},{"id":57,"en":"scheme","fr":"plan, projet, système","ch":"Ch.1 – Mots essentiels"},{"id":58,"en":"set up","fr":"établir, créer, constituer","ch":"Ch.1 – Mots essentiels"},{"id":59,"en":"settle","fr":"installer, régler à l'amiable / régler / rembourser","ch":"Ch.1 – Mots essentiels"},{"id":60,"en":"standard","fr":"norme, critère / niveau","ch":"Ch.1 – Mots essentiels"},{"id":61,"en":"status","fr":"situation","ch":"Ch.1 – Mots essentiels"},{"id":62,"en":"steady","fr":"régulier, stable","ch":"Ch.1 – Mots essentiels"},{"id":63,"en":"subcontracting","fr":"sous-traitance","ch":"Ch.1 – Mots essentiels"},{"id":64,"en":"subsidy","fr":"subvention","ch":"Ch.1 – Mots essentiels"},{"id":65,"en":"supplier","fr":"fournisseur","ch":"Ch.1 – Mots essentiels"},{"id":66,"en":"template","fr":"modèle, document-type","ch":"Ch.1 – Mots essentiels"},{"id":67,"en":"term","fr":"durée / mandat / condition","ch":"Ch.1 – Mots essentiels"},{"id":68,"en":"threshold","fr":"seuil","ch":"Ch.1 – Mots essentiels"},{"id":69,"en":"utility","fr":"service public (eau, électricité) / utilité","ch":"Ch.1 – Mots essentiels"},{"id":70,"en":"voucher","fr":"bon d'échange, justificatif","ch":"Ch.1 – Mots essentiels"},{"id":71,"en":"wage earner","fr":"salarié (statut)","ch":"Ch.1 – Mots essentiels"},{"id":72,"en":"whole","fr":"entier","ch":"Ch.1 – Mots essentiels"},{"id":73,"en":"witness","fr":"témoin","ch":"Ch.1 – Mots essentiels"},{"id":74,"en":"action","fr":"action en J, procès","ch":"Ch.2 – Sources du droit"},{"id":75,"en":"ADR","fr":"MARC","ch":"Ch.2 – Sources du droit"},{"id":76,"en":"affidavit","fr":"attestation (sur l'honneur)","ch":"Ch.2 – Sources du droit"},{"id":77,"en":"arm's length (ALP)","fr":"conclu sans favoritisme","ch":"Ch.2 – Sources du droit"},{"id":78,"en":"barrister (UK)","fr":"avocat","ch":"Ch.2 – Sources du droit"},{"id":79,"en":"business law","fr":"droit des affaires","ch":"Ch.2 – Sources du droit"},{"id":80,"en":"business lawyer","fr":"avocat d'affaires","ch":"Ch.2 – Sources du droit"},{"id":81,"en":"business legal adviser","fr":"juriste conseiller d'E","ch":"Ch.2 – Sources du droit"},{"id":82,"en":"case brief","fr":"fiche d'arrêt","ch":"Ch.2 – Sources du droit"},{"id":83,"en":"case law","fr":"jurisprudence","ch":"Ch.2 – Sources du droit"},{"id":84,"en":"clerk (UK)","fr":"faire un stage en cabinet","ch":"Ch.2 – Sources du droit"},{"id":85,"en":"clerkship (UK)","fr":"stage en cabinet","ch":"Ch.2 – Sources du droit"},{"id":86,"en":"common law","fr":"droit coutumier","ch":"Ch.2 – Sources du droit"},{"id":87,"en":"infringement","fr":"atteinte, infraction, violation","ch":"Ch.2 – Sources du droit"},{"id":88,"en":"in-house counsel","fr":"juriste d'entreprise","ch":"Ch.2 – Sources du droit"},{"id":89,"en":"IP","fr":"propriété intellectuelle","ch":"Ch.2 – Sources du droit"},{"id":90,"en":"legal department","fr":"service juridique","ch":"Ch.2 – Sources du droit"},{"id":91,"en":"paralegal","fr":"assistant juridique","ch":"Ch.2 – Sources du droit"},{"id":92,"en":"practice area","fr":"domaine de compétence","ch":"Ch.2 – Sources du droit"},{"id":93,"en":"solicitor (UK)","fr":"avocat","ch":"Ch.2 – Sources du droit"},{"id":94,"en":"statute","fr":"loi","ch":"Ch.2 – Sources du droit"},{"id":95,"en":"writ","fr":"acte judiciaire","ch":"Ch.2 – Sources du droit"},{"id":96,"en":"charge","fr":"inculpation, inculper, chef d'accusation","ch":"Ch.3 – Business torts & crimes"},{"id":97,"en":"compensation","fr":"dédommagement, réparation","ch":"Ch.3 – Business torts & crimes"},{"id":98,"en":"conspiracy","fr":"complot, association de malfaiteurs","ch":"Ch.3 – Business torts & crimes"},{"id":99,"en":"convict","fr":"reconnaître coupable de, détenu","ch":"Ch.3 – Business torts & crimes"},{"id":100,"en":"culprit","fr":"coupable (n)","ch":"Ch.3 – Business torts & crimes"},{"id":101,"en":"damage","fr":"dommages, dégâts","ch":"Ch.3 – Business torts & crimes"},{"id":102,"en":"damages","fr":"dommages-intérêts","ch":"Ch.3 – Business torts & crimes"},{"id":103,"en":"defendant","fr":"défendeur","ch":"Ch.3 – Business torts & crimes"},{"id":104,"en":"duty of care","fr":"devoir de prudence","ch":"Ch.3 – Business torts & crimes"},{"id":105,"en":"embezzlement","fr":"détournement de fonds","ch":"Ch.3 – Business torts & crimes"},{"id":106,"en":"enforce","fr":"appliquer, faire respecter","ch":"Ch.3 – Business torts & crimes"},{"id":107,"en":"enforceable","fr":"exécutoire","ch":"Ch.3 – Business torts & crimes"},{"id":108,"en":"forgery","fr":"contrefaçon, falsification","ch":"Ch.3 – Business torts & crimes"},{"id":109,"en":"fraud","fr":"dol, fraude, escroc","ch":"Ch.3 – Business torts & crimes"},{"id":110,"en":"guilty","fr":"coupable (adj) / mal","ch":"Ch.3 – Business torts & crimes"},{"id":111,"en":"harm","fr":"endommager, nuire à","ch":"Ch.3 – Business torts & crimes"},{"id":112,"en":"injury","fr":"blessure, préjudice","ch":"Ch.3 – Business torts & crimes"},{"id":113,"en":"jail","fr":"prison, emprisonner","ch":"Ch.3 – Business torts & crimes"},{"id":114,"en":"malpractice","fr":"faute professionnelle","ch":"Ch.3 – Business torts & crimes"},{"id":115,"en":"misleading","fr":"mensonger, trompeur","ch":"Ch.3 – Business torts & crimes"},{"id":116,"en":"negligence","fr":"négligence","ch":"Ch.3 – Business torts & crimes"},{"id":117,"en":"plaintiff","fr":"demandeur","ch":"Ch.3 – Business torts & crimes"},{"id":118,"en":"proceedings","fr":"procédure","ch":"Ch.3 – Business torts & crimes"},{"id":119,"en":"release","fr":"libérer","ch":"Ch.3 – Business torts & crimes"},{"id":120,"en":"sentence","fr":"condamner, peine","ch":"Ch.3 – Business torts & crimes"},{"id":121,"en":"settlement","fr":"arrangement à l'amiable","ch":"Ch.3 – Business torts & crimes"},{"id":122,"en":"stand trial","fr":"être jugé","ch":"Ch.3 – Business torts & crimes"},{"id":123,"en":"subpoena","fr":"citation en justice","ch":"Ch.3 – Business torts & crimes"},{"id":124,"en":"summons","fr":"assignation à comparaître","ch":"Ch.3 – Business torts & crimes"},{"id":125,"en":"tort","fr":"acte délictuel ou quasi délictuel","ch":"Ch.3 – Business torts & crimes"},{"id":126,"en":"try","fr":"juger (accusé)","ch":"Ch.3 – Business torts & crimes"},{"id":127,"en":"amend","fr":"modifier","ch":"Ch.4 – Formes de sociétés"},{"id":128,"en":"AGM (Annual General Meeting)","fr":"AGA","ch":"Ch.4 – Formes de sociétés"},{"id":129,"en":"articles of association","fr":"statuts","ch":"Ch.4 – Formes de sociétés"},{"id":130,"en":"authorised capital","fr":"capital social","ch":"Ch.4 – Formes de sociétés"},{"id":131,"en":"board of directors","fr":"conseil d'administration","ch":"Ch.4 – Formes de sociétés"},{"id":132,"en":"bonus shares","fr":"action gratuites","ch":"Ch.4 – Formes de sociétés"},{"id":133,"en":"business entity","fr":"forme de société","ch":"Ch.4 – Formes de sociétés"},{"id":134,"en":"by-laws","fr":"statuts","ch":"Ch.4 – Formes de sociétés"},{"id":135,"en":"carried","fr":"adoptée (résolution)","ch":"Ch.4 – Formes de sociétés"},{"id":136,"en":"chair","fr":"président","ch":"Ch.4 – Formes de sociétés"},{"id":137,"en":"charter","fr":"statuts","ch":"Ch.4 – Formes de sociétés"},{"id":138,"en":"CAO (Chief Accounting Officer)","fr":"chef comptable","ch":"Ch.4 – Formes de sociétés"},{"id":139,"en":"CEO (Chief Executive Officer)","fr":"DG","ch":"Ch.4 – Formes de sociétés"},{"id":140,"en":"CFO (Chief Financial Officer)","fr":"DAF","ch":"Ch.4 – Formes de sociétés"},{"id":141,"en":"chairman and CEO","fr":"PDG (Fr)","ch":"Ch.4 – Formes de sociétés"},{"id":142,"en":"convene","fr":"convoquer","ch":"Ch.4 – Formes de sociétés"},{"id":143,"en":"convening notice","fr":"convocation","ch":"Ch.4 – Formes de sociétés"},{"id":144,"en":"corporate tax","fr":"impôt sur les sociétés","ch":"Ch.4 – Formes de sociétés"},{"id":145,"en":"corporate veil","fr":"écran","ch":"Ch.4 – Formes de sociétés"},{"id":146,"en":"corporation (US)","fr":"société de capitaux","ch":"Ch.4 – Formes de sociétés"},{"id":147,"en":"corporation (UK)","fr":"société semi-publique","ch":"Ch.4 – Formes de sociétés"},{"id":148,"en":"director","fr":"administrateur","ch":"Ch.4 – Formes de sociétés"},{"id":149,"en":"EGM (Extraordinary General Meeting)","fr":"AGE","ch":"Ch.4 – Formes de sociétés"},{"id":150,"en":"file a document","fr":"déposer, enregistrer officiellement","ch":"Ch.4 – Formes de sociétés"},{"id":151,"en":"float","fr":"introduire en bourse","ch":"Ch.4 – Formes de sociétés"},{"id":152,"en":"general partner","fr":"commandité","ch":"Ch.4 – Formes de sociétés"},{"id":153,"en":"general partnership","fr":"SNC","ch":"Ch.4 – Formes de sociétés"},{"id":154,"en":"go private","fr":"se retirer de la cote","ch":"Ch.4 – Formes de sociétés"},{"id":155,"en":"go public","fr":"s'introduire en bourse","ch":"Ch.4 – Formes de sociétés"},{"id":156,"en":"goodwill","fr":"plus-value latente, écart d'acquisition","ch":"Ch.4 – Formes de sociétés"},{"id":157,"en":"headquarters","fr":"siège social","ch":"Ch.4 – Formes de sociétés"},{"id":158,"en":"HO=Head Office","fr":"siège social","ch":"Ch.4 – Formes de sociétés"},{"id":159,"en":"incorporate","fr":"créer (sté)","ch":"Ch.4 – Formes de sociétés"},{"id":160,"en":"incorporation","fr":"constitution","ch":"Ch.4 – Formes de sociétés"},{"id":161,"en":"IPO=Initial Public Offering","fr":"introduction en bourse","ch":"Ch.4 – Formes de sociétés"},{"id":162,"en":"item on the agenda","fr":"point à l'ordre du jour","ch":"Ch.4 – Formes de sociétés"},{"id":163,"en":"joint-stock company","fr":"société de capitaux","ch":"Ch.4 – Formes de sociétés"},{"id":164,"en":"legal person","fr":"personne morale","ch":"Ch.4 – Formes de sociétés"},{"id":165,"en":"liability","fr":"responsabilité","ch":"Ch.4 – Formes de sociétés"},{"id":166,"en":"limited company","fr":"société à responsabilité limitée","ch":"Ch.4 – Formes de sociétés"},{"id":167,"en":"LLC","fr":"SARL US","ch":"Ch.4 – Formes de sociétés"},{"id":168,"en":"Ltd (private limited company)","fr":"SARL UK","ch":"Ch.4 – Formes de sociétés"},{"id":169,"en":"Managing Director (UK)","fr":"directeur général","ch":"Ch.4 – Formes de sociétés"},{"id":170,"en":"memorandum of association","fr":"statuts","ch":"Ch.4 – Formes de sociétés"},{"id":171,"en":"minutes of a meeting","fr":"PV d'une assemblée","ch":"Ch.4 – Formes de sociétés"},{"id":172,"en":"motion","fr":"motion","ch":"Ch.4 – Formes de sociétés"},{"id":173,"en":"nominal capital = authorized capital","fr":"capital social","ch":"Ch.4 – Formes de sociétés"},{"id":174,"en":"officer","fr":"dirigeant","ch":"Ch.4 – Formes de sociétés"},{"id":175,"en":"organisation chart","fr":"organigramme","ch":"Ch.4 – Formes de sociétés"},{"id":176,"en":"paid up","fr":"libéré","ch":"Ch.4 – Formes de sociétés"},{"id":177,"en":"parent company","fr":"société mère","ch":"Ch.4 – Formes de sociétés"},{"id":178,"en":"partnership","fr":"société de personnes","ch":"Ch.4 – Formes de sociétés"},{"id":179,"en":"pass a resolution","fr":"voter une résolution","ch":"Ch.4 – Formes de sociétés"},{"id":180,"en":"plc (public limited company)","fr":"SA UK","ch":"Ch.4 – Formes de sociétés"},{"id":181,"en":"pre-emption rights","fr":"droits de préemption","ch":"Ch.4 – Formes de sociétés"},{"id":182,"en":"quorum","fr":"quorum","ch":"Ch.4 – Formes de sociétés"},{"id":183,"en":"remove from office","fr":"relever de ses fonctions","ch":"Ch.4 – Formes de sociétés"},{"id":184,"en":"share capital=issued capital","fr":"capital social","ch":"Ch.4 – Formes de sociétés"},{"id":185,"en":"share premium","fr":"prime d'émission","ch":"Ch.4 – Formes de sociétés"},{"id":186,"en":"shield","fr":"écran","ch":"Ch.4 – Formes de sociétés"},{"id":187,"en":"sleeping partner","fr":"commanditaire","ch":"Ch.4 – Formes de sociétés"},{"id":188,"en":"sole","fr":"unique","ch":"Ch.4 – Formes de sociétés"},{"id":189,"en":"stake","fr":"participation, part","ch":"Ch.4 – Formes de sociétés"},{"id":190,"en":"subsidiary","fr":"filiale","ch":"Ch.4 – Formes de sociétés"},{"id":191,"en":"supervisory board","fr":"conseil de surveillance","ch":"Ch.4 – Formes de sociétés"},{"id":192,"en":"term of office","fr":"mandat","ch":"Ch.4 – Formes de sociétés"},{"id":193,"en":"ultra vires","fr":"au-delà des pouvoirs conférés","ch":"Ch.4 – Formes de sociétés"},{"id":194,"en":"undertaking","fr":"entreprise","ch":"Ch.4 – Formes de sociétés"},{"id":195,"en":"venture","fr":"entreprise","ch":"Ch.4 – Formes de sociétés"},{"id":196,"en":"venue","fr":"lieu","ch":"Ch.4 – Formes de sociétés"},{"id":197,"en":"bid","fr":"offre, soumission, offrir","ch":"Ch.5 – Restructuring"},{"id":198,"en":"bidder","fr":"offrant, initiateur (OPA)","ch":"Ch.5 – Restructuring"},{"id":199,"en":"bullet payment","fr":"paiement in fine","ch":"Ch.5 – Restructuring"},{"id":200,"en":"carve out","fr":"scission partielle","ch":"Ch.5 – Restructuring"},{"id":201,"en":"divestment","fr":"cession d'actifs","ch":"Ch.5 – Restructuring"},{"id":202,"en":"downsizing","fr":"réduction d'effectifs","ch":"Ch.5 – Restructuring"},{"id":203,"en":"drag along","fr":"obligation de sortie proportionnelle","ch":"Ch.5 – Restructuring"},{"id":204,"en":"due diligence","fr":"audit (avant fusion, etc.)","ch":"Ch.5 – Restructuring"},{"id":205,"en":"equity capital","fr":"capitaux propres","ch":"Ch.5 – Restructuring"},{"id":206,"en":"executive summary","fr":"résumé opérationnel M&A","ch":"Ch.5 – Restructuring"},{"id":207,"en":"fairness opinion","fr":"fairness opinion","ch":"Ch.5 – Restructuring"},{"id":208,"en":"globalisation","fr":"mondialisation","ch":"Ch.5 – Restructuring"},{"id":209,"en":"IOI","fr":"indication d'intérêt M&A","ch":"Ch.5 – Restructuring"},{"id":210,"en":"LBO","fr":"achat avec effet de levier","ch":"Ch.5 – Restructuring"},{"id":211,"en":"LOI (= term sheet= MOU)","fr":"lettre d'intention M&A, LBO","ch":"Ch.5 – Restructuring"},{"id":212,"en":"merger","fr":"fusion","ch":"Ch.5 – Restructuring"},{"id":213,"en":"NDA (non disclosure agreement)","fr":"accord de confidentialité M&A","ch":"Ch.5 – Restructuring"},{"id":214,"en":"OM","fr":"résumé de l'offre M&A","ch":"Ch.5 – Restructuring"},{"id":215,"en":"poison pill","fr":"pilule empoisonnée","ch":"Ch.5 – Restructuring"},{"id":216,"en":"raise capital","fr":"lever des capitaux","ch":"Ch.5 – Restructuring"},{"id":217,"en":"relocate","fr":"délocaliser","ch":"Ch.5 – Restructuring"},{"id":218,"en":"shotgun = buy or sell = Texas Shootout Clause","fr":"cl shotgun, coercitive (achat-vente forcée) SPA","ch":"Ch.5 – Restructuring"},{"id":219,"en":"SPA (stock purchase agreement)","fr":"accord de cession d'actions","ch":"Ch.5 – Restructuring"},{"id":220,"en":"spin-off","fr":"scission","ch":"Ch.5 – Restructuring"},{"id":221,"en":"tag along","fr":"droit de sortie proportionnelle","ch":"Ch.5 – Restructuring"},{"id":222,"en":"takeover","fr":"acquisition","ch":"Ch.5 – Restructuring"},{"id":223,"en":"takeover bid","fr":"OPA","ch":"Ch.5 – Restructuring"},{"id":224,"en":"tender offer","fr":"OPA","ch":"Ch.5 – Restructuring"},{"id":225,"en":"venture capital","fr":"capital risque","ch":"Ch.5 – Restructuring"},{"id":226,"en":"administrative receiver","fr":"administrateur","ch":"Ch.6 – Insolvabilité"},{"id":227,"en":"ailing","fr":"en difficulté","ch":"Ch.6 – Insolvabilité"},{"id":228,"en":"bankruptcy","fr":"faillite","ch":"Ch.6 – Insolvabilité"},{"id":229,"en":"bankruptcy administrator","fr":"administrateur","ch":"Ch.6 – Insolvabilité"},{"id":230,"en":"Chapter 7","fr":"liquidation (US)","ch":"Ch.6 – Insolvabilité"},{"id":231,"en":"Chapter 11","fr":"faillite stratégique, procédure de sauvegarde (US)","ch":"Ch.6 – Insolvabilité"},{"id":232,"en":"collateral","fr":"nantissement, garantie","ch":"Ch.6 – Insolvabilité"},{"id":233,"en":"collection","fr":"perception, recouvrement","ch":"Ch.6 – Insolvabilité"},{"id":234,"en":"creditors' committee","fr":"comité de créanciers","ch":"Ch.6 – Insolvabilité"},{"id":235,"en":"DIP (Debtor in possession)","fr":"débiteur non dessaisi dans le Chap. 11","ch":"Ch.6 – Insolvabilité"},{"id":236,"en":"file a petition in bankruptcy","fr":"déposer le bilan / acquitter","ch":"Ch.6 – Insolvabilité"},{"id":237,"en":"discharge","fr":"réhabiliter","ch":"Ch.6 – Insolvabilité"},{"id":238,"en":"file for bankruptcy","fr":"déposer le bilan","ch":"Ch.6 – Insolvabilité"},{"id":239,"en":"floating charge","fr":"charge ou nantissement flottant sur des biens non spécifiés","ch":"Ch.6 – Insolvabilité"},{"id":240,"en":"garnishment","fr":"saisie-arrêt","ch":"Ch.6 – Insolvabilité"},{"id":241,"en":"gross","fr":"brut","ch":"Ch.6 – Insolvabilité"},{"id":242,"en":"insolvency","fr":"insolvabilité","ch":"Ch.6 – Insolvabilité"},{"id":243,"en":"mismanagement","fr":"mauvaise gestion","ch":"Ch.6 – Insolvabilité"},{"id":244,"en":"pledge","fr":"gage, gager","ch":"Ch.6 – Insolvabilité"},{"id":245,"en":"receiver","fr":"administrateur judiciaire","ch":"Ch.6 – Insolvabilité"},{"id":246,"en":"receivership","fr":"redressement judiciaire","ch":"Ch.6 – Insolvabilité"},{"id":247,"en":"secured creditor","fr":"créancier privilégié","ch":"Ch.6 – Insolvabilité"},{"id":248,"en":"security","fr":"caution, garantie","ch":"Ch.6 – Insolvabilité"},{"id":249,"en":"solvency","fr":"solvabilité","ch":"Ch.6 – Insolvabilité"},{"id":250,"en":"suspension of payments","fr":"suspension des poursuites individuelles","ch":"Ch.6 – Insolvabilité"},{"id":251,"en":"unsecured creditor","fr":"créancier chirographaire","ch":"Ch.6 – Insolvabilité"},{"id":252,"en":"wind up","fr":"liquider","ch":"Ch.6 – Insolvabilité"},{"id":253,"en":"workout plan","fr":"plan de redressement","ch":"Ch.6 – Insolvabilité"},{"id":254,"en":"abuse of dominant position","fr":"abus de position dominante","ch":"Ch.7 – Droit de la concurrence"},{"id":255,"en":"allege","fr":"alléguer, prétendre","ch":"Ch.7 – Droit de la concurrence"},{"id":256,"en":"competition law","fr":"droit de la concurrence","ch":"Ch.7 – Droit de la concurrence"},{"id":257,"en":"deceptive","fr":"trompeur","ch":"Ch.7 – Droit de la concurrence"},{"id":258,"en":"divestiture","fr":"scission","ch":"Ch.7 – Droit de la concurrence"},{"id":259,"en":"monopolisation","fr":"monopolisation","ch":"Ch.7 – Droit de la concurrence"},{"id":260,"en":"monopoly","fr":"monopole","ch":"Ch.7 – Droit de la concurrence"},{"id":261,"en":"predatory pricing","fr":"prix prédateur","ch":"Ch.7 – Droit de la concurrence"},{"id":262,"en":"restraint of trade","fr":"entrave","ch":"Ch.7 – Droit de la concurrence"},{"id":263,"en":"tying arrangement (= bundling)","fr":"vente forcée, vente liée","ch":"Ch.7 – Droit de la concurrence"},{"id":264,"en":"unfair competition","fr":"concurrence déloyale","ch":"Ch.7 – Droit de la concurrence"},{"id":265,"en":"violation","fr":"violation, infraction","ch":"Ch.7 – Droit de la concurrence"},{"id":266,"en":"affirmative action","fr":"discrimination positive","ch":"Ch.8 – Droit du travail"},{"id":267,"en":"assignment","fr":"mission","ch":"Ch.8 – Droit du travail"},{"id":268,"en":"benefit","fr":"allocation, avantage","ch":"Ch.8 – Droit du travail"},{"id":269,"en":"bias","fr":"distorsion, partialité","ch":"Ch.8 – Droit du travail"},{"id":270,"en":"bonus","fr":"prime","ch":"Ch.8 – Droit du travail"},{"id":271,"en":"career change","fr":"reconversion","ch":"Ch.8 – Droit du travail"},{"id":272,"en":"compensation","fr":"rémunération","ch":"Ch.8 – Droit du travail"},{"id":273,"en":"co-workers","fr":"collègues","ch":"Ch.8 – Droit du travail"},{"id":274,"en":"collective bargaining agreement","fr":"convention collective","ch":"Ch.8 – Droit du travail"},{"id":275,"en":"disabled","fr":"handicapé","ch":"Ch.8 – Droit du travail"},{"id":276,"en":"discriminatory","fr":"discriminatoire","ch":"Ch.8 – Droit du travail"},{"id":277,"en":"dismissal","fr":"licenciement","ch":"Ch.8 – Droit du travail"},{"id":278,"en":"dispute","fr":"conflit","ch":"Ch.8 – Droit du travail"},{"id":279,"en":"early retirement","fr":"préretraite","ch":"Ch.8 – Droit du travail"},{"id":280,"en":"expense account","fr":"remboursement de frais","ch":"Ch.8 – Droit du travail"},{"id":281,"en":"family allowances","fr":"allocations familiales","ch":"Ch.8 – Droit du travail"},{"id":282,"en":"fixed-end contract","fr":"CDD","ch":"Ch.8 – Droit du travail"},{"id":283,"en":"fringe benefits","fr":"avantages en nature","ch":"Ch.8 – Droit du travail"},{"id":284,"en":"genuine","fr":"authentique, véritable, sincère","ch":"Ch.8 – Droit du travail"},{"id":285,"en":"harassment","fr":"harcèlement","ch":"Ch.8 – Droit du travail"},{"id":286,"en":"head","fr":"chef","ch":"Ch.8 – Droit du travail"},{"id":287,"en":"hierarchy","fr":"hiérarchie","ch":"Ch.8 – Droit du travail"},{"id":288,"en":"hire","fr":"recruter","ch":"Ch.8 – Droit du travail"},{"id":289,"en":"internship","fr":"stage","ch":"Ch.8 – Droit du travail"},{"id":290,"en":"Labor Code","fr":"Code du Travail","ch":"Ch.8 – Droit du travail"},{"id":291,"en":"leave","fr":"congé","ch":"Ch.8 – Droit du travail"},{"id":292,"en":"minimum wage","fr":"SMIC","ch":"Ch.8 – Droit du travail"},{"id":293,"en":"occupational","fr":"professionnel","ch":"Ch.8 – Droit du travail"},{"id":294,"en":"open-end contract","fr":"CDI","ch":"Ch.8 – Droit du travail"},{"id":295,"en":"optional profit-sharing plan","fr":"intéressement","ch":"Ch.8 – Droit du travail"},{"id":296,"en":"payroll","fr":"personnel, registre du personnel","ch":"Ch.8 – Droit du travail"},{"id":297,"en":"pension scheme","fr":"régime de retraite","ch":"Ch.8 – Droit du travail"},{"id":298,"en":"perk","fr":"avantages en nature","ch":"Ch.8 – Droit du travail"},{"id":299,"en":"pregnancy","fr":"grossesse","ch":"Ch.8 – Droit du travail"},{"id":300,"en":"professional misconduct","fr":"faute professionnelle","ch":"Ch.8 – Droit du travail"},{"id":301,"en":"profit sharing","fr":"participation des salariés","ch":"Ch.8 – Droit du travail"},{"id":302,"en":"public holidays","fr":"jours fériés","ch":"Ch.8 – Droit du travail"},{"id":303,"en":"real and serious grounds","fr":"cause réelle et sérieuse","ch":"Ch.8 – Droit du travail"},{"id":304,"en":"reprimand","fr":"blâme","ch":"Ch.8 – Droit du travail"},{"id":305,"en":"run","fr":"diriger","ch":"Ch.8 – Droit du travail"},{"id":306,"en":"senior executive","fr":"cadre supérieur","ch":"Ch.8 – Droit du travail"},{"id":307,"en":"seniority","fr":"ancienneté","ch":"Ch.8 – Droit du travail"},{"id":308,"en":"severance pay","fr":"indemnité de licenciement","ch":"Ch.8 – Droit du travail"},{"id":309,"en":"sick leave","fr":"arrêt maladie","ch":"Ch.8 – Droit du travail"},{"id":310,"en":"social security contributions","fr":"charges sociales","ch":"Ch.8 – Droit du travail"},{"id":311,"en":"staff delegate","fr":"délégué du personnel","ch":"Ch.8 – Droit du travail"},{"id":312,"en":"stock option","fr":"stock option","ch":"Ch.8 – Droit du travail"},{"id":313,"en":"temp","fr":"intérimaire, faire de l'intérim","ch":"Ch.8 – Droit du travail"},{"id":314,"en":"transfer","fr":"muter","ch":"Ch.8 – Droit du travail"},{"id":315,"en":"trial period=trial run","fr":"période d'essai","ch":"Ch.8 – Droit du travail"},{"id":316,"en":"unfair dismissal","fr":"licenciement abusif","ch":"Ch.8 – Droit du travail"},{"id":317,"en":"union","fr":"syndicat","ch":"Ch.8 – Droit du travail"},{"id":318,"en":"union delegate","fr":"délégué syndical","ch":"Ch.8 – Droit du travail"},{"id":319,"en":"union rep","fr":"représentant syndical","ch":"Ch.8 – Droit du travail"},{"id":320,"en":"vocational training","fr":"formation professionnelle","ch":"Ch.8 – Droit du travail"},{"id":321,"en":"whistle blowing","fr":"dénonciation de pratiques illicites dans l'E","ch":"Ch.8 – Droit du travail"},{"id":322,"en":"wilful misconduct","fr":"faute lourde","ch":"Ch.8 – Droit du travail"},{"id":323,"en":"workforce","fr":"effectif","ch":"Ch.8 – Droit du travail"},{"id":324,"en":"work placement","fr":"stage","ch":"Ch.8 – Droit du travail"},{"id":325,"en":"working hours","fr":"temps de travail","ch":"Ch.8 – Droit du travail"},{"id":326,"en":"workplace","fr":"lieu de travail","ch":"Ch.8 – Droit du travail"},{"id":327,"en":"account holder","fr":"titulaire d'un compte","ch":"Ch.9 – Banque & finance"},{"id":328,"en":"asset management","fr":"gestion d'actifs","ch":"Ch.9 – Banque & finance"},{"id":329,"en":"balance","fr":"solde","ch":"Ch.9 – Banque & finance"},{"id":330,"en":"bank charges","fr":"agios, frais bancaires","ch":"Ch.9 – Banque & finance"},{"id":331,"en":"bank transfer","fr":"virement bancaire","ch":"Ch.9 – Banque & finance"},{"id":332,"en":"bank draft (BD)","fr":"traite bancaire","ch":"Ch.9 – Banque & finance"},{"id":333,"en":"bill of exchange","fr":"lettre de change","ch":"Ch.9 – Banque & finance"},{"id":334,"en":"charge","fr":"facturer","ch":"Ch.9 – Banque & finance"},{"id":335,"en":"commercial paper","fr":"effet de commerce","ch":"Ch.9 – Banque & finance"},{"id":336,"en":"commitment","fr":"engagement","ch":"Ch.9 – Banque & finance"},{"id":337,"en":"credit rating","fr":"indice de solvabilité, note, score","ch":"Ch.9 – Banque & finance"},{"id":338,"en":"downpayment","fr":"acompte","ch":"Ch.9 – Banque & finance"},{"id":339,"en":"deferred","fr":"différé, à terme","ch":"Ch.9 – Banque & finance"},{"id":340,"en":"deposit","fr":"verser, déposer, dépôt","ch":"Ch.9 – Banque & finance"},{"id":341,"en":"draft","fr":"traite","ch":"Ch.9 – Banque & finance"},{"id":342,"en":"draw","fr":"tirer","ch":"Ch.9 – Banque & finance"},{"id":343,"en":"entitled to","fr":"qui a droit à","ch":"Ch.9 – Banque & finance"},{"id":344,"en":"HNWI=high net worth individual","fr":"personne fortunée","ch":"Ch.9 – Banque & finance"},{"id":345,"en":"instalment","fr":"versement, mensualité, livraison","ch":"Ch.9 – Banque & finance"},{"id":346,"en":"investment bank (US)","fr":"banque d'affaire","ch":"Ch.9 – Banque & finance"},{"id":347,"en":"IOU=I Owe you","fr":"reconnaissance de dettes","ch":"Ch.9 – Banque & finance"},{"id":348,"en":"letter of credit","fr":"lettre de crédit","ch":"Ch.9 – Banque & finance"},{"id":349,"en":"line of credit","fr":"ligne de crédit","ch":"Ch.9 – Banque & finance"},{"id":350,"en":"loan","fr":"prêt","ch":"Ch.9 – Banque & finance"},{"id":351,"en":"merchant bank (UK)","fr":"banque d'affaire","ch":"Ch.9 – Banque & finance"},{"id":352,"en":"money laundering","fr":"blanchiment d'argent","ch":"Ch.9 – Banque & finance"},{"id":353,"en":"note","fr":"billet à ordre, lettre de change","ch":"Ch.9 – Banque & finance"},{"id":354,"en":"outstanding","fr":"impayé, en circulation","ch":"Ch.9 – Banque & finance"},{"id":355,"en":"pay back","fr":"rembourser","ch":"Ch.9 – Banque & finance"},{"id":356,"en":"pay into","fr":"verser sur","ch":"Ch.9 – Banque & finance"},{"id":357,"en":"portfolio management","fr":"gestion de portefeuille","ch":"Ch.9 – Banque & finance"},{"id":358,"en":"promissory note","fr":"billet à ordre","ch":"Ch.9 – Banque & finance"},{"id":359,"en":"principal (n)","fr":"capital","ch":"Ch.9 – Banque & finance"},{"id":360,"en":"retainer","fr":"acompte","ch":"Ch.9 – Banque & finance"},{"id":361,"en":"savings","fr":"épargne","ch":"Ch.9 – Banque & finance"},{"id":362,"en":"secure a loan","fr":"obtenir un prêt","ch":"Ch.9 – Banque & finance"},{"id":363,"en":"statement","fr":"relevé de compte","ch":"Ch.9 – Banque & finance"},{"id":364,"en":"status inquiry","fr":"demande de renseignements (solvabilité)","ch":"Ch.9 – Banque & finance"},{"id":365,"en":"subtract","fr":"soustraire, déduire","ch":"Ch.9 – Banque & finance"},{"id":366,"en":"wealth management","fr":"gestion de fortune","ch":"Ch.9 – Banque & finance"},{"id":367,"en":"withdraw","fr":"retirer","ch":"Ch.9 – Banque & finance"},{"id":368,"en":"withdrawal","fr":"retrait","ch":"Ch.9 – Banque & finance"},{"id":369,"en":"audited","fr":"certifié","ch":"Ch.10 – Bourse & valeurs"},{"id":370,"en":"annual report","fr":"rapport annuel","ch":"Ch.10 – Bourse & valeurs"},{"id":371,"en":"bear","fr":"produire, rapporter / baissier","ch":"Ch.10 – Bourse & valeurs"},{"id":372,"en":"bearish","fr":"à la baisse","ch":"Ch.10 – Bourse & valeurs"},{"id":373,"en":"bond","fr":"obligation","ch":"Ch.10 – Bourse & valeurs"},{"id":374,"en":"broker","fr":"intermédiaire, courtier","ch":"Ch.10 – Bourse & valeurs"},{"id":375,"en":"bull","fr":"haussier","ch":"Ch.10 – Bourse & valeurs"},{"id":376,"en":"bullish","fr":"à la hausse","ch":"Ch.10 – Bourse & valeurs"},{"id":377,"en":"closing","fr":"clôture","ch":"Ch.10 – Bourse & valeurs"},{"id":378,"en":"debt security","fr":"titre de créance","ch":"Ch.10 – Bourse & valeurs"},{"id":379,"en":"equities","fr":"actions côtées","ch":"Ch.10 – Bourse & valeurs"},{"id":380,"en":"equity security","fr":"titre de participation","ch":"Ch.10 – Bourse & valeurs"},{"id":381,"en":"ex-dividend","fr":"sans dividende","ch":"Ch.10 – Bourse & valeurs"},{"id":382,"en":"financial statements","fr":"états financiers","ch":"Ch.10 – Bourse & valeurs"},{"id":383,"en":"fixed-income security","fr":"produit obligataire","ch":"Ch.10 – Bourse & valeurs"},{"id":384,"en":"insider dealing","fr":"délit d'initié","ch":"Ch.10 – Bourse & valeurs"},{"id":385,"en":"leverage","fr":"financement","ch":"Ch.10 – Bourse & valeurs"},{"id":386,"en":"leveraged","fr":"endetté","ch":"Ch.10 – Bourse & valeurs"},{"id":387,"en":"OTC","fr":"hors cote / en vente libre","ch":"Ch.10 – Bourse & valeurs"},{"id":388,"en":"par-value","fr":"valeur nominale","ch":"Ch.10 – Bourse & valeurs"},{"id":389,"en":"post","fr":"afficher","ch":"Ch.10 – Bourse & valeurs"},{"id":390,"en":"projection","fr":"prévision","ch":"Ch.10 – Bourse & valeurs"},{"id":391,"en":"prospectus","fr":"prospectus","ch":"Ch.10 – Bourse & valeurs"},{"id":392,"en":"quotation","fr":"cotation","ch":"Ch.10 – Bourse & valeurs"},{"id":393,"en":"returns","fr":"bénéfices, gains","ch":"Ch.10 – Bourse & valeurs"},{"id":394,"en":"rights issue","fr":"émission de droits de souscription","ch":"Ch.10 – Bourse & valeurs"},{"id":395,"en":"service a debt","fr":"rembourser une dette","ch":"Ch.10 – Bourse & valeurs"},{"id":396,"en":"SEC","fr":"Securities and Exchange Commission","ch":"Ch.10 – Bourse & valeurs"},{"id":397,"en":"share","fr":"part, action","ch":"Ch.10 – Bourse & valeurs"},{"id":398,"en":"shareholder","fr":"actionnaire","ch":"Ch.10 – Bourse & valeurs"},{"id":399,"en":"shareholding","fr":"actionnariat","ch":"Ch.10 – Bourse & valeurs"},{"id":400,"en":"stock exchange","fr":"bourse","ch":"Ch.10 – Bourse & valeurs"},{"id":401,"en":"SWF* (sovereign wealth fund)","fr":"fonds souverain","ch":"Ch.10 – Bourse & valeurs"},{"id":402,"en":"takeover","fr":"rachat, prise de contrôle","ch":"Ch.10 – Bourse & valeurs"},{"id":403,"en":"UCITS","fr":"OPCVM","ch":"Ch.10 – Bourse & valeurs"},{"id":404,"en":"warrant","fr":"warrant, certificat d'option titrisé","ch":"Ch.10 – Bourse & valeurs"},{"id":405,"en":"yield","fr":"rendement, produire","ch":"Ch.10 – Bourse & valeurs"},{"id":406,"en":"accounting firm","fr":"cabinet d'audit","ch":"Ch.11 – Fiscalité & compta"},{"id":407,"en":"accounts payable","fr":"compte fournisseur","ch":"Ch.11 – Fiscalité & compta"},{"id":408,"en":"accrue","fr":"s'accumuler","ch":"Ch.11 – Fiscalité & compta"},{"id":409,"en":"accrued interest","fr":"intérêts courus","ch":"Ch.11 – Fiscalité & compta"},{"id":410,"en":"allocation","fr":"ventilation","ch":"Ch.11 – Fiscalité & compta"},{"id":411,"en":"allowance","fr":"allocation, abattement","ch":"Ch.11 – Fiscalité & compta"},{"id":412,"en":"amended","fr":"rectificative","ch":"Ch.11 – Fiscalité & compta"},{"id":413,"en":"amortization","fr":"amortissement (prêt, actif incorporel)","ch":"Ch.11 – Fiscalité & compta"},{"id":414,"en":"appropriation","fr":"affectation","ch":"Ch.11 – Fiscalité & compta"},{"id":415,"en":"assess a company","fr":"taxer une entreprise","ch":"Ch.11 – Fiscalité & compta"},{"id":416,"en":"assets","fr":"actif, patrimoine","ch":"Ch.11 – Fiscalité & compta"},{"id":417,"en":"back-tax","fr":"arriéré d'impôts","ch":"Ch.11 – Fiscalité & compta"},{"id":418,"en":"bad debt","fr":"créance douteuse, irrécouvrable","ch":"Ch.11 – Fiscalité & compta"},{"id":419,"en":"balance sheet","fr":"bilan","ch":"Ch.11 – Fiscalité & compta"},{"id":420,"en":"book value","fr":"valeur comptable","ch":"Ch.11 – Fiscalité & compta"},{"id":421,"en":"borrowings","fr":"emprunts","ch":"Ch.11 – Fiscalité & compta"},{"id":422,"en":"bottom line","fr":"résultat financier","ch":"Ch.11 – Fiscalité & compta"},{"id":423,"en":"breakdown","fr":"ventilation","ch":"Ch.11 – Fiscalité & compta"},{"id":424,"en":"break-even point","fr":"point mort, seuil de rentabilité","ch":"Ch.11 – Fiscalité & compta"},{"id":425,"en":"capex","fr":"dépenses d'investissement","ch":"Ch.11 – Fiscalité & compta"},{"id":426,"en":"capital allowance","fr":"dotation aux amortissements fiscale","ch":"Ch.11 – Fiscalité & compta"},{"id":427,"en":"capital gains","fr":"plus-values","ch":"Ch.11 – Fiscalité & compta"},{"id":428,"en":"capital losses","fr":"moins-values","ch":"Ch.11 – Fiscalité & compta"},{"id":429,"en":"capital surplus","fr":"prime d'émission","ch":"Ch.11 – Fiscalité & compta"},{"id":430,"en":"carry back","fr":"report en arrière","ch":"Ch.11 – Fiscalité & compta"},{"id":431,"en":"carry forward","fr":"report en avant","ch":"Ch.11 – Fiscalité & compta"},{"id":432,"en":"cash flow","fr":"cash flow, MBA","ch":"Ch.11 – Fiscalité & compta"},{"id":433,"en":"CPA (certified public accountant)","fr":"expert-comptable US","ch":"Ch.11 – Fiscalité & compta"},{"id":434,"en":"charge off","fr":"charge exceptionnelle","ch":"Ch.11 – Fiscalité & compta"},{"id":435,"en":"chartered accountant","fr":"expert-comptable","ch":"Ch.11 – Fiscalité & compta"},{"id":436,"en":"claim","fr":"créance, demande, réclamation","ch":"Ch.11 – Fiscalité & compta"},{"id":437,"en":"close the books","fr":"clôturer les comptes","ch":"Ch.11 – Fiscalité & compta"},{"id":438,"en":"collect taxes","fr":"percevoir des impôts","ch":"Ch.11 – Fiscalité & compta"},{"id":439,"en":"common stock","fr":"action ordinaire","ch":"Ch.11 – Fiscalité & compta"},{"id":440,"en":"contribution","fr":"cotisation, versement","ch":"Ch.11 – Fiscalité & compta"},{"id":441,"en":"corporation tax","fr":"impôt sur les sociétés","ch":"Ch.11 – Fiscalité & compta"},{"id":442,"en":"cost price","fr":"prix de revient","ch":"Ch.11 – Fiscalité & compta"},{"id":443,"en":"cost-effective","fr":"rentable","ch":"Ch.11 – Fiscalité & compta"},{"id":444,"en":"current assets","fr":"actif circulant","ch":"Ch.11 – Fiscalité & compta"},{"id":445,"en":"cross-border","fr":"transfrontalier","ch":"Ch.11 – Fiscalité & compta"},{"id":446,"en":"deferral","fr":"report, étalement","ch":"Ch.11 – Fiscalité & compta"},{"id":447,"en":"depreciation","fr":"dépréciation, amortissement (actif corporel)","ch":"Ch.11 – Fiscalité & compta"},{"id":448,"en":"derived from","fr":"tiré de","ch":"Ch.11 – Fiscalité & compta"},{"id":449,"en":"discount","fr":"décote, remise, escompter","ch":"Ch.11 – Fiscalité & compta"},{"id":450,"en":"dues","fr":"cotisations","ch":"Ch.11 – Fiscalité & compta"},{"id":451,"en":"earnings","fr":"profits, bénéfices","ch":"Ch.11 – Fiscalité & compta"},{"id":452,"en":"EBIT","fr":"résultat opérationnel","ch":"Ch.11 – Fiscalité & compta"},{"id":453,"en":"entry","fr":"écriture","ch":"Ch.11 – Fiscalité & compta"},{"id":454,"en":"equity","fr":"action, fonds propres","ch":"Ch.11 – Fiscalité & compta"},{"id":455,"en":"estate","fr":"patrimoine","ch":"Ch.11 – Fiscalité & compta"},{"id":456,"en":"exemption","fr":"exonération","ch":"Ch.11 – Fiscalité & compta"},{"id":457,"en":"expenses","fr":"dépenses","ch":"Ch.11 – Fiscalité & compta"},{"id":458,"en":"fair value","fr":"valeur vénale","ch":"Ch.11 – Fiscalité & compta"},{"id":459,"en":"flat tax","fr":"impôt forfaitaire","ch":"Ch.11 – Fiscalité & compta"},{"id":460,"en":"financial year","fr":"exercice","ch":"Ch.11 – Fiscalité & compta"},{"id":461,"en":"file a claim","fr":"déposer une réclamation","ch":"Ch.11 – Fiscalité & compta"},{"id":462,"en":"fiscal year","fr":"exercice","ch":"Ch.11 – Fiscalité & compta"},{"id":463,"en":"graduated","fr":"progressif","ch":"Ch.11 – Fiscalité & compta"},{"id":464,"en":"idle","fr":"non productif","ch":"Ch.11 – Fiscalité & compta"},{"id":465,"en":"impairment","fr":"perte de valeur","ch":"Ch.11 – Fiscalité & compta"},{"id":466,"en":"impairment test","fr":"test de dépréciation","ch":"Ch.11 – Fiscalité & compta"},{"id":467,"en":"impairment value","fr":"valeur résiduelle","ch":"Ch.11 – Fiscalité & compta"},{"id":468,"en":"income","fr":"revenu","ch":"Ch.11 – Fiscalité & compta"},{"id":469,"en":"income statement","fr":"compte de résultat","ch":"Ch.11 – Fiscalité & compta"},{"id":470,"en":"income tax","fr":"impôt sur le revenu","ch":"Ch.11 – Fiscalité & compta"},{"id":471,"en":"input VAT","fr":"TVA déductible","ch":"Ch.11 – Fiscalité & compta"},{"id":472,"en":"intangible assets","fr":"actifs incorporels","ch":"Ch.11 – Fiscalité & compta"},{"id":473,"en":"intragroup","fr":"intra-groupe","ch":"Ch.11 – Fiscalité & compta"},{"id":474,"en":"IRS (internal revenue service)","fr":"fisc américain","ch":"Ch.11 – Fiscalité & compta"},{"id":475,"en":"item","fr":"poste (bilan)","ch":"Ch.11 – Fiscalité & compta"},{"id":476,"en":"itemize","fr":"être au réel (déclaration de revenus)","ch":"Ch.11 – Fiscalité & compta"},{"id":477,"en":"inventory","fr":"stock","ch":"Ch.11 – Fiscalité & compta"},{"id":478,"en":"land tax","fr":"taxe foncière","ch":"Ch.11 – Fiscalité & compta"},{"id":479,"en":"ledger","fr":"registre / grand livre","ch":"Ch.11 – Fiscalité & compta"},{"id":480,"en":"levy a tax on","fr":"percevoir un impôt sur","ch":"Ch.11 – Fiscalité & compta"},{"id":481,"en":"liabilities","fr":"dettes, passif","ch":"Ch.11 – Fiscalité & compta"},{"id":482,"en":"liable to","fr":"assujetti à","ch":"Ch.11 – Fiscalité & compta"},{"id":483,"en":"lump sum","fr":"somme forfaitaire","ch":"Ch.11 – Fiscalité & compta"},{"id":484,"en":"market value","fr":"valeur marchande","ch":"Ch.11 – Fiscalité & compta"},{"id":485,"en":"mark-up","fr":"marge","ch":"Ch.11 – Fiscalité & compta"},{"id":486,"en":"minority interest","fr":"intérêt des minoritaires","ch":"Ch.11 – Fiscalité & compta"},{"id":487,"en":"net operating income","fr":"résultat d'exploitation net","ch":"Ch.11 – Fiscalité & compta"},{"id":488,"en":"offset","fr":"compenser","ch":"Ch.11 – Fiscalité & compta"},{"id":489,"en":"one-off","fr":"exceptionnel","ch":"Ch.11 – Fiscalité & compta"},{"id":490,"en":"operating cash flow","fr":"capacité d'autofinancement","ch":"Ch.11 – Fiscalité & compta"},{"id":491,"en":"operating profit","fr":"résultat d'exploitation","ch":"Ch.11 – Fiscalité & compta"},{"id":492,"en":"opex","fr":"charges d'exploitation","ch":"Ch.11 – Fiscalité & compta"},{"id":493,"en":"output VAT","fr":"TVA collectée","ch":"Ch.11 – Fiscalité & compta"},{"id":494,"en":"overheads","fr":"frais généraux","ch":"Ch.11 – Fiscalité & compta"},{"id":495,"en":"payables","fr":"dettes à payer","ch":"Ch.11 – Fiscalité & compta"},{"id":496,"en":"personal income tax","fr":"impôt sur le revenu","ch":"Ch.11 – Fiscalité & compta"},{"id":497,"en":"prepaid","fr":"constaté d'avance","ch":"Ch.11 – Fiscalité & compta"},{"id":498,"en":"preferred stock","fr":"actions de préférence","ch":"Ch.11 – Fiscalité & compta"},{"id":499,"en":"pretax earnings","fr":"bénéfices avant impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":500,"en":"proceeds","fr":"revenus, recettes, produit","ch":"Ch.11 – Fiscalité & compta"},{"id":501,"en":"projected","fr":"prévu","ch":"Ch.11 – Fiscalité & compta"},{"id":502,"en":"profit margin","fr":"marge bénéficiaire","ch":"Ch.11 – Fiscalité & compta"},{"id":503,"en":"prorated","fr":"au prorata","ch":"Ch.11 – Fiscalité & compta"},{"id":504,"en":"rate","fr":"taux","ch":"Ch.11 – Fiscalité & compta"},{"id":505,"en":"receivables","fr":"créances","ch":"Ch.11 – Fiscalité & compta"},{"id":506,"en":"redeem","fr":"rembourser, amortir","ch":"Ch.11 – Fiscalité & compta"},{"id":507,"en":"retained earnings","fr":"RAN, revenus non distribués","ch":"Ch.11 – Fiscalité & compta"},{"id":508,"en":"revenue","fr":"chiffre d'affaires","ch":"Ch.11 – Fiscalité & compta"},{"id":509,"en":"shareholder equity","fr":"fonds propres, capitaux propres","ch":"Ch.11 – Fiscalité & compta"},{"id":510,"en":"statutory auditor","fr":"commissaire aux comptes","ch":"Ch.11 – Fiscalité & compta"},{"id":511,"en":"sundries","fr":"divers","ch":"Ch.11 – Fiscalité & compta"},{"id":512,"en":"surtax","fr":"contribution additionnelle","ch":"Ch.11 – Fiscalité & compta"},{"id":513,"en":"table","fr":"tableau","ch":"Ch.11 – Fiscalité & compta"},{"id":514,"en":"tax adjustment","fr":"redressement fiscal","ch":"Ch.11 – Fiscalité & compta"},{"id":515,"en":"tax allowance","fr":"abattement fiscal","ch":"Ch.11 – Fiscalité & compta"},{"id":516,"en":"tax audit","fr":"contrôle fiscal","ch":"Ch.11 – Fiscalité & compta"},{"id":517,"en":"tax authorities","fr":"fisc","ch":"Ch.11 – Fiscalité & compta"},{"id":518,"en":"tax basis","fr":"assiette de l'impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":519,"en":"tax basis erosion","fr":"minoration de l'assiette fiscale","ch":"Ch.11 – Fiscalité & compta"},{"id":520,"en":"tax bracket","fr":"tranche fiscale","ch":"Ch.11 – Fiscalité & compta"},{"id":521,"en":"tax break","fr":"crédit d'impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":522,"en":"tax burden","fr":"charge fiscale","ch":"Ch.11 – Fiscalité & compta"},{"id":523,"en":"tax credit","fr":"crédit d'impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":524,"en":"tax evasion","fr":"évasion fiscale","ch":"Ch.11 – Fiscalité & compta"},{"id":525,"en":"tax exemption","fr":"exonération fiscale","ch":"Ch.11 – Fiscalité & compta"},{"id":526,"en":"tax filing","fr":"déclaration d'impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":527,"en":"tax liability","fr":"impôt dû, assujettissement à l'impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":528,"en":"tax practitioner","fr":"fiscaliste","ch":"Ch.11 – Fiscalité & compta"},{"id":529,"en":"tax reassessment","fr":"redressement fiscal","ch":"Ch.11 – Fiscalité & compta"},{"id":530,"en":"tax relief","fr":"allégement d'impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":531,"en":"tax return","fr":"déclaration d'impôt","ch":"Ch.11 – Fiscalité & compta"},{"id":532,"en":"tax status","fr":"régime fiscal","ch":"Ch.11 – Fiscalité & compta"},{"id":533,"en":"tax treatment","fr":"régime fiscal","ch":"Ch.11 – Fiscalité & compta"},{"id":534,"en":"tax treaty","fr":"convention fiscale","ch":"Ch.11 – Fiscalité & compta"},{"id":535,"en":"trading account","fr":"compte d'exploitation","ch":"Ch.11 – Fiscalité & compta"},{"id":536,"en":"treasury stock","fr":"action propre, autodétenue","ch":"Ch.11 – Fiscalité & compta"},{"id":537,"en":"turnover","fr":"chiffre d'affaires","ch":"Ch.11 – Fiscalité & compta"},{"id":538,"en":"underreport","fr":"sous-déclarer ses revenus","ch":"Ch.11 – Fiscalité & compta"},{"id":539,"en":"VAT","fr":"TVA","ch":"Ch.11 – Fiscalité & compta"},{"id":540,"en":"wealth tax","fr":"impôt sur la fortune","ch":"Ch.11 – Fiscalité & compta"},{"id":541,"en":"write down","fr":"déprécier","ch":"Ch.11 – Fiscalité & compta"},{"id":542,"en":"write off","fr":"déprécier complètement, annuler","ch":"Ch.11 – Fiscalité & compta"},{"id":543,"en":"write up","fr":"réévaluer","ch":"Ch.11 – Fiscalité & compta"},{"id":544,"en":"withhold","fr":"retenir","ch":"Ch.11 – Fiscalité & compta"},{"id":545,"en":"withholding tax","fr":"retenue à la source","ch":"Ch.11 – Fiscalité & compta"},{"id":546,"en":"working capital","fr":"BFR / fonds de roulement","ch":"Ch.11 – Fiscalité & compta"},{"id":547,"en":"charge","fr":"grever","ch":"Ch.14 – Droit des biens"},{"id":548,"en":"chattels","fr":"biens meubles","ch":"Ch.14 – Droit des biens"},{"id":549,"en":"collateral","fr":"bien donné en garantie","ch":"Ch.14 – Droit des biens"},{"id":550,"en":"easement","fr":"droit de passage","ch":"Ch.14 – Droit des biens"},{"id":551,"en":"estate","fr":"patrimoine, masse successorale","ch":"Ch.14 – Droit des biens"},{"id":552,"en":"freehold","fr":"pleine propriété","ch":"Ch.14 – Droit des biens"},{"id":553,"en":"foreclosure","fr":"saisie immobilière","ch":"Ch.14 – Droit des biens"},{"id":554,"en":"lease","fr":"bail","ch":"Ch.14 – Droit des biens"},{"id":555,"en":"landlord","fr":"propriétaire","ch":"Ch.14 – Droit des biens"},{"id":556,"en":"misuse","fr":"abus","ch":"Ch.14 – Droit des biens"},{"id":557,"en":"mortgage","fr":"hypothèque","ch":"Ch.14 – Droit des biens"},{"id":558,"en":"ownership","fr":"propriété","ch":"Ch.14 – Droit des biens"},{"id":559,"en":"retention clause","fr":"clause de réserve de propriété","ch":"Ch.14 – Droit des biens"},{"id":560,"en":"security interest","fr":"sûreté","ch":"Ch.14 – Droit des biens"},{"id":561,"en":"seize","fr":"saisir","ch":"Ch.14 – Droit des biens"},{"id":562,"en":"tenant","fr":"locataire","ch":"Ch.14 – Droit des biens"},{"id":563,"en":"title","fr":"titre de propriété","ch":"Ch.14 – Droit des biens"},{"id":564,"en":"Act of God","fr":"catastrophe naturelle prévue dans le contrat","ch":"Ch.19 – Droit des contrats"},{"id":565,"en":"amendment","fr":"avenant","ch":"Ch.19 – Droit des contrats"},{"id":566,"en":"appendix","fr":"annexe","ch":"Ch.19 – Droit des contrats"},{"id":567,"en":"arbitration","fr":"arbitrage","ch":"Ch.19 – Droit des contrats"},{"id":568,"en":"assignment","fr":"cession","ch":"Ch.19 – Droit des contrats"},{"id":569,"en":"assignee","fr":"cessionnaire","ch":"Ch.19 – Droit des contrats"},{"id":570,"en":"assignor","fr":"cédant","ch":"Ch.19 – Droit des contrats"},{"id":571,"en":"bill of lading","fr":"connaissement","ch":"Ch.19 – Droit des contrats"},{"id":572,"en":"binding","fr":"qui lie, engage","ch":"Ch.19 – Droit des contrats"},{"id":573,"en":"boilerplate clause","fr":"clause-type","ch":"Ch.19 – Droit des contrats"},{"id":574,"en":"business day","fr":"jour ouvrable","ch":"Ch.19 – Droit des contrats"},{"id":575,"en":"breach of contract","fr":"violation, inexécution","ch":"Ch.19 – Droit des contrats"},{"id":576,"en":"by operation of law","fr":"pour motif imputable à la loi","ch":"Ch.19 – Droit des contrats"},{"id":577,"en":"caveat emptor","fr":"aux risques de l'acheteur","ch":"Ch.19 – Droit des contrats"},{"id":578,"en":"clause","fr":"clause","ch":"Ch.19 – Droit des contrats"},{"id":579,"en":"condition precedent","fr":"condition suspensive","ch":"Ch.19 – Droit des contrats"},{"id":580,"en":"condition subsequent","fr":"condition résolutoire","ch":"Ch.19 – Droit des contrats"},{"id":581,"en":"consent","fr":"consentement","ch":"Ch.19 – Droit des contrats"},{"id":582,"en":"consideration","fr":"contrepartie (contrat synallagmatique)","ch":"Ch.19 – Droit des contrats"},{"id":583,"en":"cure","fr":"remédier à","ch":"Ch.19 – Droit des contrats"},{"id":584,"en":"deceit","fr":"tromperie","ch":"Ch.19 – Droit des contrats"},{"id":585,"en":"decree","fr":"décret, arrêt","ch":"Ch.19 – Droit des contrats"},{"id":586,"en":"defaulting party","fr":"partie défaillante","ch":"Ch.19 – Droit des contrats"},{"id":587,"en":"discharge","fr":"extinction","ch":"Ch.19 – Droit des contrats"},{"id":588,"en":"duress","fr":"contrainte, violence","ch":"Ch.19 – Droit des contrats"},{"id":589,"en":"execute","fr":"signer","ch":"Ch.19 – Droit des contrats"},{"id":590,"en":"fair use","fr":"usage loyal","ch":"Ch.19 – Droit des contrats"},{"id":591,"en":"force majeure","fr":"force majeure","ch":"Ch.19 – Droit des contrats"},{"id":592,"en":"forum non conveniens","fr":"tribunal inadapté","ch":"Ch.19 – Droit des contrats"},{"id":593,"en":"fraudulent misrepresentation","fr":"fausse déclaration volontaire","ch":"Ch.19 – Droit des contrats"},{"id":594,"en":"frustration","fr":"impossibilité d'exécution","ch":"Ch.19 – Droit des contrats"},{"id":595,"en":"hereunder","fr":"au titre de la présente","ch":"Ch.19 – Droit des contrats"},{"id":596,"en":"in witness whereof","fr":"en foi de quoi","ch":"Ch.19 – Droit des contrats"},{"id":597,"en":"lapse","fr":"caducité, expirer","ch":"Ch.19 – Droit des contrats"},{"id":598,"en":"liquidated damages","fr":"clause pénale","ch":"Ch.19 – Droit des contrats"},{"id":599,"en":"material","fr":"substantiel","ch":"Ch.19 – Droit des contrats"},{"id":600,"en":"miscellaneous","fr":"divers","ch":"Ch.19 – Droit des contrats"},{"id":601,"en":"misrepresentation","fr":"déclaration inexacte","ch":"Ch.19 – Droit des contrats"},{"id":602,"en":"mistake","fr":"erreur","ch":"Ch.19 – Droit des contrats"},{"id":603,"en":"mutual mistake","fr":"erreur commune aux deux parties","ch":"Ch.19 – Droit des contrats"},{"id":604,"en":"now, therefore","fr":"ceci étant exposé","ch":"Ch.19 – Droit des contrats"},{"id":605,"en":"party","fr":"partie","ch":"Ch.19 – Droit des contrats"},{"id":606,"en":"performance","fr":"exécution","ch":"Ch.19 – Droit des contrats"},{"id":607,"en":"promissory estoppel","fr":"force obligatoire de la promesse","ch":"Ch.19 – Droit des contrats"},{"id":608,"en":"provision","fr":"disposition","ch":"Ch.19 – Droit des contrats"},{"id":609,"en":"privity","fr":"effet relatif du contrat","ch":"Ch.19 – Droit des contrats"},{"id":610,"en":"recitals","fr":"exposé préalable","ch":"Ch.19 – Droit des contrats"},{"id":611,"en":"repudiation","fr":"inexécution anticipée","ch":"Ch.19 – Droit des contrats"},{"id":612,"en":"rescission","fr":"nullité, retour au status quo ante","ch":"Ch.19 – Droit des contrats"},{"id":613,"en":"remedy","fr":"recours","ch":"Ch.19 – Droit des contrats"},{"id":614,"en":"specific performance","fr":"exécution forcée","ch":"Ch.19 – Droit des contrats"},{"id":615,"en":"subject matter of a contract","fr":"objet d'un contrat","ch":"Ch.19 – Droit des contrats"},{"id":616,"en":"term","fr":"condition, durée","ch":"Ch.19 – Droit des contrats"},{"id":617,"en":"termination","fr":"résiliation","ch":"Ch.19 – Droit des contrats"},{"id":618,"en":"time is of the essence","fr":"importance du facteur temps","ch":"Ch.19 – Droit des contrats"},{"id":619,"en":"unconscionable","fr":"léonin","ch":"Ch.19 – Droit des contrats"},{"id":620,"en":"undue influence","fr":"influence démesurée, manipulation","ch":"Ch.19 – Droit des contrats"},{"id":621,"en":"void","fr":"annuler, nul","ch":"Ch.19 – Droit des contrats"},{"id":622,"en":"waiver","fr":"renonciation","ch":"Ch.19 – Droit des contrats"},{"id":623,"en":"whereas","fr":"attendu que","ch":"Ch.19 – Droit des contrats"},{"id":624,"en":"accountable for","fr":"responsable de","ch":"Ch.20 – Glossaire général"},{"id":625,"en":"act","fr":"loi","ch":"Ch.20 – Glossaire général"},{"id":626,"en":"aforesaid","fr":"susdit, susmentionné","ch":"Ch.20 – Glossaire général"},{"id":627,"en":"appeal","fr":"appel","ch":"Ch.20 – Glossaire général"},{"id":628,"en":"artificial person","fr":"personne morale","ch":"Ch.20 – Glossaire général"},{"id":629,"en":"attorney","fr":"avocat","ch":"Ch.20 – Glossaire général"},{"id":630,"en":"award","fr":"attribuer, somme attribuée","ch":"Ch.20 – Glossaire général"},{"id":631,"en":"carriage","fr":"transport","ch":"Ch.20 – Glossaire général"},{"id":632,"en":"bad faith","fr":"mauvaise foi","ch":"Ch.20 – Glossaire général"},{"id":633,"en":"bequest","fr":"legs","ch":"Ch.20 – Glossaire général"},{"id":634,"en":"bid for a contract","fr":"soumissionner","ch":"Ch.20 – Glossaire général"},{"id":635,"en":"bona fide","fr":"réel, de bonne foi","ch":"Ch.20 – Glossaire général"},{"id":636,"en":"burden of proof","fr":"charge de la preuve","ch":"Ch.20 – Glossaire général"},{"id":637,"en":"calendar year","fr":"année civile","ch":"Ch.20 – Glossaire général"},{"id":638,"en":"case","fr":"cas, affaire","ch":"Ch.20 – Glossaire général"},{"id":639,"en":"caveat","fr":"que… se méfie","ch":"Ch.20 – Glossaire général"},{"id":640,"en":"chattel paper","fr":"biens meubles","ch":"Ch.20 – Glossaire général"},{"id":641,"en":"circumstances","fr":"circonstances, situation","ch":"Ch.20 – Glossaire général"},{"id":642,"en":"circumvent","fr":"contourner","ch":"Ch.20 – Glossaire général"},{"id":643,"en":"class action","fr":"action de groupe","ch":"Ch.20 – Glossaire général"},{"id":644,"en":"collect","fr":"recouvrer","ch":"Ch.20 – Glossaire général"},{"id":645,"en":"compel","fr":"contraindre, obliger","ch":"Ch.20 – Glossaire général"},{"id":646,"en":"compelled to","fr":"obligé de","ch":"Ch.20 – Glossaire général"},{"id":647,"en":"complaint","fr":"plainte","ch":"Ch.20 – Glossaire général"},{"id":648,"en":"completion","fr":"achèvement","ch":"Ch.20 – Glossaire général"},{"id":649,"en":"conceal","fr":"dissimuler","ch":"Ch.20 – Glossaire général"},{"id":650,"en":"construe","fr":"interpréter","ch":"Ch.20 – Glossaire général"},{"id":651,"en":"contingency","fr":"aléa, éventualité","ch":"Ch.20 – Glossaire général"},{"id":652,"en":"contingent on/upon","fr":"lié à, dépendant de","ch":"Ch.20 – Glossaire général"},{"id":653,"en":"court","fr":"tribunal","ch":"Ch.20 – Glossaire général"},{"id":654,"en":"covenant","fr":"engagement contractuel","ch":"Ch.20 – Glossaire général"},{"id":655,"en":"custom","fr":"usage","ch":"Ch.20 – Glossaire général"},{"id":656,"en":"customary","fr":"habituel","ch":"Ch.20 – Glossaire général"},{"id":657,"en":"deed","fr":"acte notarié","ch":"Ch.20 – Glossaire général"},{"id":658,"en":"deem","fr":"juger, estimer","ch":"Ch.20 – Glossaire général"},{"id":659,"en":"deem fit","fr":"estimer approprié","ch":"Ch.20 – Glossaire général"},{"id":660,"en":"derogate from","fr":"déroger à","ch":"Ch.20 – Glossaire général"},{"id":661,"en":"disposal","fr":"cession","ch":"Ch.20 – Glossaire général"},{"id":662,"en":"duly","fr":"dûment","ch":"Ch.20 – Glossaire général"},{"id":663,"en":"encumbrance","fr":"charge hypothécaire","ch":"Ch.20 – Glossaire général"},{"id":664,"en":"enforceable","fr":"exécutoire","ch":"Ch.20 – Glossaire général"},{"id":665,"en":"escrow","fr":"tiers dépositaire","ch":"Ch.20 – Glossaire général"},{"id":666,"en":"escrow agreement","fr":"convention de séquestre","ch":"Ch.20 – Glossaire général"},{"id":667,"en":"exhibit","fr":"pièce à conviction, annexe","ch":"Ch.20 – Glossaire général"},{"id":668,"en":"fairness","fr":"équité","ch":"Ch.20 – Glossaire général"},{"id":669,"en":"file","fr":"déposer, faire enregistrer","ch":"Ch.20 – Glossaire général"},{"id":670,"en":"footnote","fr":"note de bas de page","ch":"Ch.20 – Glossaire général"},{"id":671,"en":"forbear","fr":"renoncer","ch":"Ch.20 – Glossaire général"},{"id":672,"en":"forfeit","fr":"abandonner","ch":"Ch.20 – Glossaire général"},{"id":673,"en":"forfeiture","fr":"perte, confiscation, déchéance","ch":"Ch.20 – Glossaire général"},{"id":674,"en":"forward","fr":"à terme","ch":"Ch.20 – Glossaire général"},{"id":675,"en":"frivolous","fr":"abusif (procédure abusive)","ch":"Ch.20 – Glossaire général"},{"id":676,"en":"grievance","fr":"grief","ch":"Ch.20 – Glossaire général"},{"id":677,"en":"ground","fr":"motif","ch":"Ch.20 – Glossaire général"},{"id":678,"en":"guarantor","fr":"garant","ch":"Ch.20 – Glossaire général"},{"id":679,"en":"incentive","fr":"incitation, aide, prime","ch":"Ch.20 – Glossaire général"},{"id":680,"en":"incur","fr":"subir, encourir","ch":"Ch.20 – Glossaire général"},{"id":681,"en":"in force","fr":"en vigueur","ch":"Ch.20 – Glossaire général"},{"id":682,"en":"in cash","fr":"en numéraire","ch":"Ch.20 – Glossaire général"},{"id":683,"en":"in kind","fr":"en nature","ch":"Ch.20 – Glossaire général"},{"id":684,"en":"interference","fr":"ingérence","ch":"Ch.20 – Glossaire général"},{"id":685,"en":"joint and several","fr":"solidaire","ch":"Ch.20 – Glossaire général"},{"id":686,"en":"judiciary","fr":"judiciaire / la magistrature","ch":"Ch.20 – Glossaire général"},{"id":687,"en":"latent defect","fr":"vice caché","ch":"Ch.20 – Glossaire général"},{"id":688,"en":"leasehold","fr":"droit au bail","ch":"Ch.20 – Glossaire général"},{"id":689,"en":"lessee","fr":"preneur","ch":"Ch.20 – Glossaire général"},{"id":690,"en":"lessor","fr":"bailleur","ch":"Ch.20 – Glossaire général"},{"id":691,"en":"lien","fr":"privilège, droit de rétention","ch":"Ch.20 – Glossaire général"},{"id":692,"en":"loophole","fr":"vide juridique","ch":"Ch.20 – Glossaire général"},{"id":693,"en":"merit","fr":"fondement","ch":"Ch.20 – Glossaire général"},{"id":694,"en":"mitigate","fr":"atténuer","ch":"Ch.20 – Glossaire général"},{"id":695,"en":"moot","fr":"discutable","ch":"Ch.20 – Glossaire général"},{"id":696,"en":"natural person","fr":"personne physique","ch":"Ch.20 – Glossaire général"},{"id":697,"en":"passing off","fr":"usurpation d'identité","ch":"Ch.20 – Glossaire général"},{"id":698,"en":"penalty clause","fr":"clause pénale","ch":"Ch.20 – Glossaire général"},{"id":699,"en":"personalty","fr":"biens meubles","ch":"Ch.20 – Glossaire général"},{"id":700,"en":"power of attorney","fr":"procuration","ch":"Ch.20 – Glossaire général"},{"id":701,"en":"preclude","fr":"exclure","ch":"Ch.20 – Glossaire général"},{"id":702,"en":"principal and agent","fr":"commettant et préposé","ch":"Ch.20 – Glossaire général"},{"id":703,"en":"prosecute","fr":"poursuivre en justice","ch":"Ch.20 – Glossaire général"},{"id":704,"en":"provide","fr":"stipuler, fournir","ch":"Ch.20 – Glossaire général"},{"id":705,"en":"provide for","fr":"prévoir","ch":"Ch.20 – Glossaire général"},{"id":706,"en":"provided","fr":"fourni, prévu, à condition que","ch":"Ch.20 – Glossaire général"},{"id":707,"en":"proxy","fr":"mandataire, procuration","ch":"Ch.20 – Glossaire général"},{"id":708,"en":"public procurement","fr":"marché public","ch":"Ch.20 – Glossaire général"},{"id":709,"en":"purport","fr":"signification","ch":"Ch.20 – Glossaire général"},{"id":710,"en":"qualified","fr":"agréé / avec réserve","ch":"Ch.20 – Glossaire général"},{"id":711,"en":"real estate","fr":"immobilier","ch":"Ch.20 – Glossaire général"},{"id":712,"en":"realty","fr":"biens immobiliers","ch":"Ch.20 – Glossaire général"},{"id":713,"en":"redemption","fr":"rachat, remboursement","ch":"Ch.20 – Glossaire général"},{"id":714,"en":"regulations","fr":"règlement","ch":"Ch.20 – Glossaire général"},{"id":715,"en":"repeal","fr":"abroger, annuler","ch":"Ch.20 – Glossaire général"},{"id":716,"en":"requirement","fr":"exigence","ch":"Ch.20 – Glossaire général"},{"id":717,"en":"return a verdict","fr":"rendre, prononcer un verdict","ch":"Ch.20 – Glossaire général"},{"id":718,"en":"rider","fr":"avenant","ch":"Ch.20 – Glossaire général"},{"id":719,"en":"scope","fr":"étendue, portée","ch":"Ch.20 – Glossaire général"},{"id":720,"en":"seek redress","fr":"demander réparation","ch":"Ch.20 – Glossaire général"},{"id":721,"en":"ship","fr":"expédier","ch":"Ch.20 – Glossaire général"},{"id":722,"en":"slip","fr":"bordereau","ch":"Ch.20 – Glossaire général"},{"id":723,"en":"storage","fr":"entreposage, stockage","ch":"Ch.20 – Glossaire général"},{"id":724,"en":"subject to","fr":"sous réserve de / soumis à","ch":"Ch.20 – Glossaire général"},{"id":725,"en":"suit","fr":"procès, action en justice","ch":"Ch.20 – Glossaire général"},{"id":726,"en":"sustained","fr":"recevable (argument)","ch":"Ch.20 – Glossaire général"},{"id":727,"en":"tender","fr":"soumission, soumissionner","ch":"Ch.20 – Glossaire général"},{"id":728,"en":"tenderer","fr":"soumissionnaire","ch":"Ch.20 – Glossaire général"},{"id":729,"en":"testify","fr":"témoigner, déclarer","ch":"Ch.20 – Glossaire général"},{"id":730,"en":"testimony","fr":"témoignage","ch":"Ch.20 – Glossaire général"},{"id":731,"en":"third party","fr":"tiers","ch":"Ch.20 – Glossaire général"},{"id":732,"en":"trade name","fr":"raison commerciale","ch":"Ch.20 – Glossaire général"},{"id":733,"en":"transfer price","fr":"prix de transfert","ch":"Ch.20 – Glossaire général"},{"id":734,"en":"tricky","fr":"délicat, scabreux","ch":"Ch.20 – Glossaire général"},{"id":735,"en":"unavailing","fr":"vain","ch":"Ch.20 – Glossaire général"},{"id":736,"en":"under oath","fr":"sous serment","ch":"Ch.20 – Glossaire général"},{"id":737,"en":"uphold","fr":"confirmer / faire respecter","ch":"Ch.20 – Glossaire général"},{"id":738,"en":"vest","fr":"confier, investir","ch":"Ch.20 – Glossaire général"},{"id":739,"en":"veto","fr":"veto","ch":"Ch.20 – Glossaire général"},{"id":740,"en":"will","fr":"testament","ch":"Ch.20 – Glossaire général"},{"id":741,"en":"within the scope of","fr":"dans le cadre de","ch":"Ch.20 – Glossaire général"},{"id":742,"en":"withhold","fr":"retenir, prélever","ch":"Ch.20 – Glossaire général"},{"id":743,"en":"wrong","fr":"injustice, mal, tort","ch":"Ch.20 – Glossaire général"}];

const CHAPTERS = [...new Set(VOCAB.map(w => w.ch))];
const BOX_DAYS = [0, 0, 1, 3, 7, 14];
const SESSION_SIZE = 20;

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
    const np = { ...progress, [wordId]: { box, lastSeen: new Date().toISOString(), correct: cur.correct + (correct?1:0), wrong: cur.wrong + (correct?0:1) }};
    setProgress(np);
    return np;
  }

  function nextCard() {
    const ni = idx + 1;
    if (ni >= session.length) { setScreen('results'); return; }
    setIdx(ni); setRevealed(false); setSelOpt(null); setTyped(''); setTypeRes(null); setAnswered(false);
  }

  function rateFlash(rating: string) {
    const w = session[idx].word;
    const cur = progress[w.id] || {box:0};
    const box = rating==='easy' ? Math.min(cur.box+2,5) : rating==='hard' ? Math.min(cur.box+1,5) : 0;
    const earned = rating==='easy'?10:rating==='hard'?5:0;
    const np = updateWord(w.id, box, rating!=='wrong');
    const nx = xp + earned; setXp(nx); setSessXP(s => s+earned);
    setResults(r => [...r, {wordId:w.id, correct:rating!=='wrong', earned}]);
    persist(np, streak, nx, lastDate);
    nextCard();
  }

  function answerQCM(opt: string) {
    if (answered) return;
    const w = session[idx].word;
    const correct = opt === w.fr;
    const cur = progress[w.id] || {box:0};
    const box = correct ? Math.min(cur.box+1,5) : 0;
    const earned = correct ? 15 : 0;
    const np = updateWord(w.id, box, correct);
    const nx = xp+earned; setXp(nx); setSessXP(s => s+earned);
    setSelOpt(opt); setAnswered(true);
    setResults(r => [...r, {wordId:w.id, correct, earned}]);
    persist(np, streak, nx, lastDate);
  }

  function submitType() {
    if (answered || !typed.trim()) return;
    const w = session[idx].word;
    const res = checkType(typed, w.fr);
    const correct = res==='exact'||res==='close';
    const cur = progress[w.id] || {box:0};
    const box = res==='exact' ? Math.min(cur.box+1,5) : res==='close' ? cur.box : 0;
    const earned = res==='exact'?20:res==='close'?10:0;
    const np = updateWord(w.id, box, correct);
    const nx = xp+earned; setXp(nx); setSessXP(s => s+earned);
    setTypeRes(res); setAnswered(true);
    setResults(r => [...r, {wordId:w.id, correct, earned}]);
    persist(np, streak, nx, lastDate);
  }

  if (!loaded) return (
    <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{color:'#818cf8',fontSize:'1.2rem'}}>Chargement...</div>
    </div>
  );

  if (screen==='home') return <Home stats={stats} streak={streak} xp={xp} selCh={selCh} setSelCh={setSelCh} onStart={()=>startSession(false)} onMissed={()=>startSession(true)} />;
  if (screen==='quiz') {
    const item = session[idx];
    return <Quiz item={item} idx={idx} total={session.length} sessXP={sessXP}
      revealed={revealed} onReveal={()=>setRevealed(true)} onRate={rateFlash}
      selOpt={selOpt} answered={answered} onQCM={answerQCM}
      typed={typed} setTyped={setTyped} typeRes={typeRes} onType={submitType}
      onNext={nextCard} onQuit={()=>setScreen('home')} />;
  }
  if (screen==='results') {
    const correct = results.filter(r=>r.correct).length;
    return <Results results={results} correct={correct} total={results.length} sessXP={sessXP} streak={streak} xp={xp} progress={progress}
      onHome={()=>setScreen('home')} onRestart={()=>startSession(missedMode)} />;
  }
  
  return null;
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function Home({ stats, streak, xp, selCh, setSelCh, onStart, onMissed }: any) {
  const [showCh, setShowCh] = useState(false);
  const level = xpToLevel(xp);
  const xpIn = xp % 500;

  return (
    <div style={{minHeight:'100vh',background:'#0f172a',color:'white',padding:'16px',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={{textAlign:'center',paddingTop:'16px',marginBottom:'24px'}}>
          <div style={{fontSize:'2rem',fontWeight:'800',color:'#818cf8',letterSpacing:'-0.5px'}}>⚖️ Legal Vocab</div>
          <div style={{color:'#64748b',fontSize:'0.85rem',marginTop:'4px'}}>Anglais du droit des affaires • {stats.total} mots</div>
        </div>

        {/* Level card */}
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

        {/* Stats grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px',marginBottom:'12px'}}>
          {[['Total',stats.total,'#94a3b8'],['Nouveaux',stats.new,'#60a5fa'],['En cours',stats.learning,'#fbbf24'],['Maîtrisés',stats.mastered,'#34d399']].map(([label,val,color])=>(
            <div key={label as string} style={{background:'#1e293b',borderRadius:'12px',padding:'12px 8px',textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',fontWeight:'800',color: color as string}}>{val as number}</div>
              <div style={{fontSize:'0.65rem',color:'#64748b',marginTop:'2px'}}>{label as string}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{background:'#1e293b',borderRadius:'12px',padding:'12px',marginBottom:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'#64748b',marginBottom:'6px'}}>
            <span>Progression</span><span>{Math.round((stats.mastered/stats.total)*100)}%</span>
          </div>
          <div style={{height:'10px',background:'#334155',borderRadius:'6px',overflow:'hidden',display:'flex'}}>
            <div style={{background:'#10b981',width:`${(stats.mastered/stats.total)*100}%`}} />
            <div style={{background:'#f59e0b',width:`${(stats.learning/stats.total)*100}%`}} />
          </div>
          <div style={{display:'flex',gap:'12px',marginTop:'6px',fontSize:'0.7rem',color:'#64748b'}}>
            {[['#10b981','Maîtrisé'],['#f59e0b','En cours'],['#334155','Nouveau']].map(([c,l])=>(
              <span key={l} style={{display:'flex',alignItems:'center',gap:'4px'}}><span style={{width:'8px',height:'8px',borderRadius:'50%',background:c,display:'inline-block'}} />{l}</span>
            ))}
          </div>
        </div>

        {/* Chapter selector */}
        <div style={{background:'#1e293b',borderRadius:'12px',padding:'12px',marginBottom:'16px'}}>
          <button onClick={()=>setShowCh(v=>!v)} style={{width:'100%',background:'none',border:'none',color:'white',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',padding:'0',fontSize:'0.875rem',fontWeight:'500'}}>
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

        {/* Buttons */}
        <button onClick={onStart} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'700',padding:'16px',borderRadius:'16px',fontSize:'1rem',cursor:'pointer',marginBottom:'10px',transition:'opacity 0.15s'}}
          onMouseEnter={(e: any)=>e.target.style.opacity='0.9'} onMouseLeave={(e: any)=>e.target.style.opacity='1'}>
          🚀 Démarrer une session
          <div style={{fontSize:'0.8rem',fontWeight:'400',opacity:'0.8',marginTop:'2px'}}>{stats.due} mots à réviser</div>
        </button>
        {stats.missed > 0 && (
          <button onClick={onMissed} style={{width:'100%',background:'rgba(127,29,29,0.6)',border:'1px solid rgba(239,68,68,0.3)',color:'#fca5a5',fontWeight:'600',padding:'12px',borderRadius:'14px',fontSize:'0.9rem',cursor:'pointer',transition:'background 0.15s'}}
            onMouseEnter={(e: any)=>e.target.style.background='rgba(153,27,27,0.7)'} onMouseLeave={(e: any)=>e.target.style.background='rgba(127,29,29,0.6)'}>
            💪 Réviser les mots ratés ({stats.missed})
          </button>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function Quiz({ item, idx, total, sessXP, revealed, onReveal, onRate, selOpt, answered, onQCM, typed, setTyped, typeRes, onType, onNext, onQuit }: any) {
  const { word, mode, options } = item;
  const modeLabel: any = {flashcard:'🃏 Flashcard', qcm:'🎯 QCM', type:'✍️ Écriture'}[mode as string];
  const pct = ((idx+1)/total)*100;

  return (
    <div style={{minHeight:'100vh',background:'#0f172a',color:'white',padding:'16px',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column'}}>
      <div style={{maxWidth:'480px',margin:'0 auto',width:'100%',flex:1,display:'flex',flexDirection:'column'}}>
        {/* Top bar */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <button onClick={onQuit} style={{background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:'0.85rem',padding:'4px'}}>✕ Quitter</button>
          <span style={{background:'rgba(99,102,241,0.15)',border:'1px solid rgba(99,102,241,0.3)',color:'#a5b4fc',borderRadius:'20px',padding:'4px 12px',fontSize:'0.8rem',fontWeight:'500'}}>{modeLabel}</span>
          <span style={{color:'#fbbf24',fontWeight:'700',fontSize:'0.9rem'}}>⚡ {sessXP} XP</span>
        </div>
        {/* Progress */}
        <div style={{marginBottom:'8px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'#64748b',marginBottom:'4px'}}>
            <span>{idx+1} / {total}</span><span>{Math.round(pct)}%</span>
          </div>
          <div style={{height:'4px',background:'#1e293b',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,#6366f1,#818cf8)',width:`${pct}%`,transition:'width 0.3s',borderRadius:'4px'}} />
          </div>
        </div>
        {/* Chapter */}
        <div style={{textAlign:'center',fontSize:'0.72rem',color:'#475569',marginBottom:'12px'}}>{word.ch}</div>
        {/* Word */}
        <div style={{background:'linear-gradient(135deg,#1e293b,#0f1f35)',border:'1px solid #334155',borderRadius:'20px',padding:'32px 24px',textAlign:'center',marginBottom:'16px'}}>
          <div style={{fontSize:'1.8rem',fontWeight:'800',letterSpacing:'-0.5px'}}>{word.en}</div>
        </div>
        {/* Mode */}
        {mode==='flashcard' && <FlashCard word={word} revealed={revealed} onReveal={onReveal} onRate={onRate} />}
        {mode==='qcm' && <QCM word={word} options={options} selOpt={selOpt} answered={answered} onAnswer={onQCM} onNext={onNext} />}
        {mode==='type' && <Type word={word} typed={typed} setTyped={setTyped} typeRes={typeRes} answered={answered} onSubmit={onType} onNext={onNext} />}
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
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
          {[['✗ Raté','wrong','rgba(127,29,29,0.5)','#fca5a5','rgba(153,27,27,0.7)'],
            ['~ Difficile','hard','rgba(120,53,15,0.5)','#fcd34d','rgba(146,64,14,0.7)'],
            ['✓ Facile','easy','rgba(6,78,59,0.5)','#6ee7b7','rgba(4,120,87,0.7)']].map(([label,rating,bg,color,hbg])=>(
            <button key={rating} onClick={()=>onRate(rating)}
              style={{background:bg,border:`1px solid ${color}30`,color,fontWeight:'600',padding:'12px 8px',borderRadius:'12px',cursor:'pointer',fontSize:'0.85rem',transition:'background 0.15s'}}
              onMouseEnter={(e: any)=>e.target.style.background=hbg} onMouseLeave={(e: any)=>e.target.style.background=bg}>{label}</button>
          ))}
        </div>
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
      {answered && <button onClick={onNext} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'600',padding:'14px',borderRadius:'12px',cursor:'pointer',fontSize:'0.9rem'}}>Suivant →</button>}
    </div>
  );
}

function Type({ word, typed, setTyped, typeRes, answered, onSubmit, onNext }: any) {
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
        </div>
      )}
      {!answered
        ? <button onClick={onSubmit} disabled={!typed.trim()} style={{width:'100%',background:typed.trim()?'linear-gradient(135deg,#4f46e5,#7c3aed)':'#1e293b',border:'none',color:typed.trim()?'white':'#475569',fontWeight:'600',padding:'14px',borderRadius:'12px',cursor:typed.trim()?'pointer':'not-allowed',fontSize:'0.9rem',transition:'all 0.15s'}}>Valider</button>
        : <button onClick={onNext} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'600',padding:'14px',borderRadius:'12px',cursor:'pointer',fontSize:'0.9rem'}}>Suivant →</button>
      }
    </div>
  );
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────
function Results({ results, correct, total, sessXP, streak, xp, progress, onHome, onRestart }: any) {
  const pct = total > 0 ? Math.round((correct/total)*100) : 0;
  const emoji = pct>=80?'🎉':pct>=50?'💪':'📚';
  const missed = results.filter((r: any)=>!r.correct).map((r: any)=>VOCAB.find(w=>w.id===r.wordId)).filter(Boolean);

  return (
    <div style={{minHeight:'100vh',background:'#0f172a',color:'white',padding:'16px',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={{textAlign:'center',paddingTop:'32px',marginBottom:'24px'}}>
          <div style={{fontSize:'4rem',marginBottom:'8px'}}>{emoji}</div>
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
          <button onClick={onRestart} style={{width:'100%',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',border:'none',color:'white',fontWeight:'700',padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'0.95rem'}}>🔄 Recommencer</button>
          <button onClick={onHome} style={{width:'100%',background:'#1e293b',border:'1px solid #334155',color:'white',fontWeight:'600',padding:'14px',borderRadius:'14px',cursor:'pointer',fontSize:'0.95rem'}}>🏠 Retour</button>
        </div>
      </div>
    </div>
  );
}