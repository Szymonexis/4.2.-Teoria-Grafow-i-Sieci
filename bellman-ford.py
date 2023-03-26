class Graph:
    def __init__(self, vertices_num):
        self.vertices_num = vertices_num   # Ilość wierzchołków
        self.graph = []     # Lista krawędzi

    # Dodanie krawędzi
    def add_edge(self, source_node, target_node, cost):
        self.graph.append([source_node, target_node, cost])

    # Wypisanie rozwiązania
    def print_solution(self, distances):
        print("Vertex Distance from Source")
        for k in range(self.vertices_num):
            print("{0}\t\t{1}".format(k, distances[k]))

    # 0. Algorytm - przyjmuje wierzchołek żródla w grafie
    def bellman_ford(self, src):
        # 1. Nadaj kazdemu z wierzchołków inf jako odległośc od żródła i przypisz żródłu odległość od niego samego == 0
        distances = [float("Inf")] * self.vertices_num
        distances[src] = 0

        # 2.0. Przejdź każdy wierzchołek (bez wierzchołka żródła)
        for _ in range(self.vertices_num - 1):
            # 2.1. Przejdź każdą krawędź gdzie source to w. początkowy, target to w. końcowy a cost to waga
            for source, target, cost in self.graph:
                # 2.2. Jeżeli waga dla w. początkowego jest już obliczona i waga drogi dla w. początkowego + waga aktualnej
                # krawędzi jest mniejsza od aktualnie obliczonej wagi w. końcowego (skorzystanie z Metody Relaksacji)
                if distances[source] != float("Inf") and distances[source] + cost < distances[target]:
                    # 2.3. To zapisz wage drogi dla w. początkowego + waga aktualnej krawędzi jako
                    # nową wagę drogi dla w. końcowego
                    distances[target] = distances[source] + cost

        # 3.0. Dla każdej krawędzi grafu sprawdź czy nie istnieje ujemny cykl
        for source, target, cost in self.graph:
            # 3.1. Jeżeli droga dla danego w. początkowego jest rózna od inf i waga drogi dla w. początkowego + waga
            # aktualnej krawędzi jest mniejsza od aktualnie obliczonej wagi w. końcowego
            if distances[source] != float("Inf") and distances[source] + cost < distances[target]:
                # 3.2. Powiadom że graf posiada cykl ujemny
                print("Graph contains negative weight cycle")
                return

        self.print_solution(distances)


if __name__ == "__main__":
    g = Graph(5)

    g.add_edge(0, 1, 2)
    g.add_edge(0, 2, 4)
    g.add_edge(1, 3, 2)
    g.add_edge(2, 4, 3)
    g.add_edge(2, 3, 4)
    g.add_edge(4, 3, -5)

    g.bellman_ford(0)
