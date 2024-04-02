-- CreateTable
CREATE TABLE "Machine" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "fabricant" TEXT NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supervision" (
    "id" SERIAL NOT NULL,
    "idMachine" INTEGER NOT NULL,
    "idCoach" INTEGER NOT NULL,

    CONSTRAINT "Supervision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" SERIAL NOT NULL,
    "matricule" INTEGER NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "postnom" TEXT NOT NULL,
    "data_de_naissance" TIMESTAMP(3) NOT NULL,
    "addresse" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,
    "disponibilite" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "idCohorte" INTEGER NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apprenant" (
    "id" SERIAL NOT NULL,
    "matricule" INTEGER NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "postnom" TEXT NOT NULL,
    "data_de_naissance" TIMESTAMP(3) NOT NULL,
    "addresse" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,
    "idCohorte" INTEGER NOT NULL,
    "idMachine" INTEGER NOT NULL,

    CONSTRAINT "Apprenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cohorte" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "idSession" INTEGER NOT NULL,

    CONSTRAINT "Cohorte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "annee" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "ville" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Machine_model_key" ON "Machine"("model");

-- CreateIndex
CREATE UNIQUE INDEX "Machine_fabricant_key" ON "Machine"("fabricant");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_matricule_key" ON "Coach"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "Coach"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_telephone_key" ON "Coach"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Apprenant_matricule_key" ON "Apprenant"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Apprenant_email_key" ON "Apprenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Apprenant_telephone_key" ON "Apprenant"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Cohorte_code_key" ON "Cohorte"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Session_ville_key" ON "Session"("ville");

-- AddForeignKey
ALTER TABLE "Supervision" ADD CONSTRAINT "Supervision_idMachine_fkey" FOREIGN KEY ("idMachine") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supervision" ADD CONSTRAINT "Supervision_idCoach_fkey" FOREIGN KEY ("idCoach") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_idCohorte_fkey" FOREIGN KEY ("idCohorte") REFERENCES "Cohorte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apprenant" ADD CONSTRAINT "Apprenant_idCohorte_fkey" FOREIGN KEY ("idCohorte") REFERENCES "Cohorte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apprenant" ADD CONSTRAINT "Apprenant_idMachine_fkey" FOREIGN KEY ("idMachine") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cohorte" ADD CONSTRAINT "Cohorte_idSession_fkey" FOREIGN KEY ("idSession") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
