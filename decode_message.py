import requests

def retrieve_data(url):
    response = requests.get(url)
    return response.text

def parse_data(data):
    grid = {}
    max_x, max_y = 0, 0
    
    lines = data.strip().split("\n")
    for line in lines:
        parts = line.split()
        
        # Check if the line has exactly three parts and if the second and third parts are integers
        if len(parts) == 3 and parts[1].isdigit() and parts[2].isdigit():
            char = parts[0]
            x = int(parts[1])
            y = int(parts[2])
            grid[(x, y)] = char
            max_x = max(max_x, x)
            max_y = max(max_y, y)
        else:
            print(f"Skipping invalid line: {line}")
    
    return grid, max_x, max_y

def print_grid(grid, max_x, max_y):
    for y in range(max_y + 1):
        row = ""
        for x in range(max_x + 1):
            row += grid.get((x, y), " ")
        print(row)

def print_unicode_grid_from_url(url):
    # Step 1: Retrieve data from the URL
    data = retrieve_data(url)
    
    # Step 2: Parse the data to extract characters and their positions
    grid, max_x, max_y = parse_data(data)
    
    # Step 3: Print the grid
    print_grid(grid, max_x, max_y)

# Example usage with the provided URL
url = 'https://docs.google.com/document/d/e/2PACX-1vSHesOf9hv2sPOntssYrEdubmMQm8lwjfwv6NPjjmIRYs_FOYXtqrYgjh85jBUebK9swPXh_a5TJ5Kl/pub?format=txt'
print_unicode_grid_from_url(url)
