package pagination

// Paginator handles pagination logic
type Paginator struct {
	Page       int
	PerPage    int
	TotalItems int
	TotalPages int
}

// NewPaginator creates a new paginator
func NewPaginator(page, perPage, totalItems int) *Paginator {
	if page < 1 {
		page = 1
	}
	if perPage < 1 {
		perPage = 10
	}

	totalPages := (totalItems + perPage - 1) / perPage

	return &Paginator{
		Page:       page,
		PerPage:    perPage,
		TotalItems: totalItems,
		TotalPages: totalPages,
	}
}

// Offset calculates the offset for database queries
func (p *Paginator) Offset() int {
	return (p.Page - 1) * p.PerPage
}

// HasNext checks if there's a next page
func (p *Paginator) HasNext() bool {
	return p.Page < p.TotalPages
}

// HasPrev checks if there's a previous page
func (p *Paginator) HasPrev() bool {
	return p.Page > 1
}

// NextPage returns the next page number
func (p *Paginator) NextPage() int {
	if p.HasNext() {
		return p.Page + 1
	}
	return p.Page
}

// PrevPage returns the previous page number
func (p *Paginator) PrevPage() int {
	if p.HasPrev() {
		return p.Page - 1
	}
	return p.Page
}
