def paginate(arr, offset, limit):
    if offset < 0:
        raise ValueError('Offset must be greater than or equal to 0')
    if limit < 1:
        raise ValueError('Limit must be greater than or equal to 1')
    
    if offset >= len(arr):
        return []
    
    return arr[offset : offset + limit]
  
  
  
def pad (num): 
  if (num > 99):
    return f"#{num}"
  
  if (num > 9):
    return f"#0{num}"

  return f"#00{num}"
