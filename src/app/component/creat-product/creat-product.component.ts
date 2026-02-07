import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creat-product',
  templateUrl: './creat-product.component.html',
  styleUrls: ['./creat-product.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreatProductComponent implements OnInit {
  productForm!: FormGroup;
  previewImages: string[] = [];

  categories = ["Men", "Women", "Kids", "Bag", "Shoes", "Watches"];
  sectionTypes = ["Clothing", "Accessories", "Electronics"];
  sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      sectionType: ['', Validators.required],  
      sizes: this.fb.array([]),
      images: [null, Validators.required]
    });
  }

  get sizesArray() {
    return this.productForm.get('sizes') as FormArray;
  }

  onSizeChange(size: string, event: any) {
    if (event.target.checked) {
      this.sizesArray.push(this.fb.control(size));
    } else {
      const index = this.sizesArray.controls.findIndex(c => c.value === size);
      if (index >= 0) this.sizesArray.removeAt(index);
    }
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;
    if (files && files.length) {
      this.productForm.patchValue({ images: files });
      this.previewImages = Array.from(files).map(f => URL.createObjectURL(f));
    }
  }

  submit() {
    if (!this.productForm.valid) return;

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price.toString());
    formData.append('category', this.productForm.value.category);
    formData.append('sectionType', this.productForm.value.sectionType);

    this.productForm.value.sizes.forEach((size: string) => formData.append('sizes', size));

    const files = this.productForm.value.images as FileList;
    if (files) {
      Array.from(files).forEach(file => formData.append('images', file));
    }

    this.productService.createProduct(formData).subscribe({
      next: () => this.router.navigate(['/product']),
      error: err => console.error('Create error:', err)
    });
  }
}
