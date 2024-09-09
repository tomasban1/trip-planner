# Turizmas

Vartotojų rolės:

-   Admin
-   Eilinis vartotojas

Platformoje yra registruotos vietos, tą daro admin:

-   pavadinimas
-   adresas
-   koordinates
-   nuotraukos
-   video

Registruoti vartotojai, kurie gali sudaryti keliones planą/maršrutą:

-   pasirenka iš lankytinų vietų sarašo
-   sarašą galima filtruoti

Neregistruoti vartotojai gali matyti visas lankytinas vietas, tiesiog negali planuotis kelionės

## Optional

Vartotojas gali pasiūlyti naują lankytiną vietą

## Pages

-   Public:
    -   Pagrindinis(main)
    -   Lankytinų vietų sarašas
    -   Individualios lankytinos vietos informacija
    -   Login
    -   Register
    -   404
    -   Logout
-   Admin:
    -   Lankytinų vietų sarašas (lentele + delete ikona)
    -   Individualios lankytinos vietos informacija
    -   Lankytinos vietos registracija/redagavimas
    -   Vartotojų sarašas (lentele + delete ikona)
    -   Vartotojo informacija:
        -   Pasirinkto vartotojo sudarytos kelionės planas
-   User:
    -   Kelionės planavimo įrankis
        -   Trinti
        -   Sukeisti vietomis
    -   Profilio informacija
        -   Turėtų leisti pasikeisti pagrindinę info
        -   Turėtų leisti pasikeisti slaptažodį
        -   Galimybė pašalinti savo paskyrą

### Optional pages

-   public
    -   kontaktų forma
-   admin
    -   kontaktu sarasas (email, žinutė, laikas + delete)
    -   Atsiliepimai apie lankytinas vietas
-   user
    -   kontaktų forma (email, (užpildytas ir nerodomas) delete)
    -   Atsiliepimo forma

## Projekto kodo architektūra

-   Frontend
    -   visi puslapiai yra ant react
-   backend + db
    -   api
-   other:
    -   coockies
