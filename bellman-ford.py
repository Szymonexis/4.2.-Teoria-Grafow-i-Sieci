class Graph:
    def __init__(self, vertices):
        self.vertices = vertices   # Total number of vertices in the directed graph
        self.graph = []     # Array of edges

    # Add edges
    def add_edge(self, source, target, cost):
        self.graph.append([source, target, cost])

    # Print the solution
    def print_solution(self, distances):
        print("Vertex Distance from Source")
        for k in range(self.vertices):
            print("{0}\t\t{1}".format(k, distances[k]))

    def bellman_ford(self, src):
        distances = [float("Inf")] * self.vertices
        distances[src] = 0

        for _ in range(self.vertices - 1):
            for source, target, cost in self.graph:
                if distances[source] != float("Inf") and distances[source] + cost < distances[target]:
                    distances[target] = distances[source] + cost

        for source, target, cost in self.graph:
            if distances[source] != float("Inf") and distances[source] + cost < distances[target]:
                print("Graph contains negative weight cycle")
                return

        self.print_solution(distances)


g = Graph(5)

g.add_edge(0, 1, 2)
g.add_edge(0, 2, 4)
g.add_edge(1, 3, 2)
g.add_edge(2, 4, 3)
g.add_edge(2, 3, 4)
g.add_edge(4, 3, -5)

g.bellman_ford(0)
