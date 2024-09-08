class APIPageResponse:
    def __init__(self, count, next, previous, results):
        self.count = count
        self.next = next
        self.previous = previous
        self.results = results
        
        