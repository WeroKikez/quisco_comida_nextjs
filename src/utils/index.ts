export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

export function getImagePath(imagePath : string) {
    const cloudinaryUrl = 'https://res.cloudinary.com'

    return imagePath.startsWith(cloudinaryUrl) ? imagePath : `/products/${imagePath}.jpg`
}