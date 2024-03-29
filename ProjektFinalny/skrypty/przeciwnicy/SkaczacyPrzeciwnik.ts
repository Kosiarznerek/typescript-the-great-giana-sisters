//Dostępni skaczący przeciwnicy
enum SKACZACY_PRZECIWNIK {
    SLIME = 'SLIME',
    RYBKA = 'RYBKA'
}

//Klasa SkaczacyPrzeciwnik
class SkaczacyPrzeciwnik extends OscylujacyProstokat {

    public readonly typ: SKACZACY_PRZECIWNIK;
    private _animacja: {
        gora: AnimatorPoklatkowy,
        dol: AnimatorPoklatkowy
    };

    /**
     * Tworzy przeciwnika, który samodzielnie skacza
     * @param {Wektor} pozycja Pozycja startowa
     * @param {number} wysokosc Rozmiar
     * @param {number} szerokosc Rozmiar
     * @param {SKACZACY_PRZECIWNIK} typ
     */
    constructor(pozycja: Wektor, wysokosc: number, szerokosc: number, typ: SKACZACY_PRZECIWNIK) {
        //Odpowiednie dane w zależności od parametrow
        switch (typ) {
            case 'SLIME':
                super(pozycja, wysokosc, szerokosc, 2, 60, new Wektor(0, -1));
                this._animacja = {
                    gora: new AnimatorPoklatkowy(GRAFIKI.przeciwnicy.slime, 10),
                    dol: new AnimatorPoklatkowy(GRAFIKI.przeciwnicy.slime, 10),
                };
                break;
            case 'RYBKA':
                super(pozycja, wysokosc, szerokosc, 2, 100, new Wektor(0, -1));
                this._animacja = {
                    gora: new AnimatorPoklatkowy(GRAFIKI.przeciwnicy.rybka.gora, 8),
                    dol: new AnimatorPoklatkowy(GRAFIKI.przeciwnicy.rybka.dol, 8),
                };
                break;
        }
        this.typ = typ;
    }

    /**
     * Aktualizuje obenie wyświetlaną grafike
     */
    public aktualizujGrafike(): void {
        //Jeżeli obiekt porusza sie w góre
        if (this.obecnyKierunek.y < 0) {
            let grafika: HTMLImageElement | null = this._animacja.gora.nastepnaKlatka();
            if (grafika !== null) this.grafika = grafika;
            else {
                this._animacja.gora.cofnijDoPoczatku();
                this.grafika = this._animacja.gora.nastepnaKlatka() || new Image;
            }
            this._animacja.dol.cofnijDoPoczatku();
        }

        //Jeżeli obiekt porusza się na dół
        if (this.obecnyKierunek.y > 0) {
            let grafika: HTMLImageElement | null = this._animacja.dol.nastepnaKlatka();
            if (grafika !== null) this.grafika = grafika;
            else {
                this._animacja.dol.cofnijDoPoczatku();
                this.grafika = this._animacja.dol.nastepnaKlatka() || new Image;
            }
            this._animacja.gora.cofnijDoPoczatku();
        }
    }
}