def paginate(arr, offset, limit):
  if (offset < 0):
    raise Exception('Offset must be greater than or equal 0')
  if (limit < 1):
    raise Exception('Limit must be greater than or equal 1')
  
  return arr[offset : offset + limit]
  
  
  
def pad (num): 
  if (num > 99):
    return f"#{num}"
  
  if (num > 9):
    return f"#0{num}"

  return f"#00{num}"

