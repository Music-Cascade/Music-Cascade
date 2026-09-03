-- CreateTable
CREATE TABLE "SongMapping" (
    "id" TEXT NOT NULL,
    "isrc" TEXT,
    "spotifyId" TEXT,
    "ytVideoId" TEXT,
    "appleMusicId" TEXT,
    "deezerId" TEXT,
    "tidalId" TEXT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "durationSec" INTEGER,
    "failCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastVerifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SongMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongMapping_spotifyId_key" ON "SongMapping"("spotifyId");

-- CreateIndex
CREATE UNIQUE INDEX "SongMapping_ytVideoId_key" ON "SongMapping"("ytVideoId");

-- CreateIndex
CREATE UNIQUE INDEX "SongMapping_appleMusicId_key" ON "SongMapping"("appleMusicId");

-- CreateIndex
CREATE UNIQUE INDEX "SongMapping_deezerId_key" ON "SongMapping"("deezerId");

-- CreateIndex
CREATE UNIQUE INDEX "SongMapping_tidalId_key" ON "SongMapping"("tidalId");

-- CreateIndex
CREATE INDEX "SongMapping_isrc_idx" ON "SongMapping"("isrc");

-- CreateIndex
CREATE INDEX "SongMapping_title_artist_idx" ON "SongMapping"("title", "artist");
