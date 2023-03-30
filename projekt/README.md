# TeoriaGrafowISieciSem8

Zmiany do zrobienia w projekcie:
- pozbyc sie stanu start/play/pause - zamiast tego bedziemy korzystac ze strzalek. Po wyrzuceniu stanu algorytmu przez `bellman-for.service.ts` do store, bedziemy sie przelaczac miedzy x'owym stanem z y stanow za pomoca strzalek lewo/prawo (dodac tez counter stanow w toolbarze)
- `bellman-ford.service.ts` powinien zwracac matryce stanu, tj. dla matrycy grafu G o wierzcholkach $\{A,B,C,D\}$ powinien zwracac tablice $\{A,B,C,D\} \times \{oldCost, newCost\}$ oraz wierzcholek aktualnie sprawdzany (tj. source i target). Tablica bedzie wysweitlana pod grafem, natomiast dwa wierzcholki musza zostac zwrocone po to aby moc je zaznaczyc na grafie jako aktualnie odwiedzane przez algorytm
- pozbyc sie zbednej logiki wewnatrz`bellman-ford.service.ts`
- dodac odpowiednie zmiany do prawej czesci strony (graf), tak, aby mozna bylo wiswietlic tablice $\{A,B,C,D\} \times \{oldCost, newCost\}$ w czasie rzeczywistym


