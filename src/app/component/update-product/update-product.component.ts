import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  previewImages: { file?: File; url: string }[] = []; // الصور القديمة والجديدة

  categories = ["Men", "Women", "Kids", "Bag", "Shoes", "Watches"];
  sectionTypes = ["Clothing", "Accessories", "Electronics"];
  sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      sectionType: ['', Validators.required],
      sizes: this.fb.array([]),
      images: [null] // للملفات الجديدة فقط
    });

    this.loadProduct(this.productId);
  }

  get sizesArray() {
    return this.productForm.get('sizes') as FormArray;
  }

  onSizeChange(size: string, event: any) {
    if (event.target.checked) this.sizesArray.push(this.fb.control(size));
    else {
      const index = this.sizesArray.controls.findIndex(c => c.value === size);
      if (index >= 0) this.sizesArray.removeAt(index);
    }
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;
    if (files && files.length) {
      Array.from(files).forEach(file => {
        this.previewImages.push({ file, url: URL.createObjectURL(file) });
      });
    }
  }

  removeImage(index: number) {
    // حذف الصورة سواء كانت قديمة أو جديدة
    this.previewImages.splice(index, 1);
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        sectionType: product.sectionType
      });

      product.sizes?.forEach((size: string) => this.sizesArray.push(this.fb.control(size)));

      // تحميل الصور القديمة فقط كـ روابط
      this.previewImages = product.images.map((url: string) => ({ url }));
    });
  }

  submit() {
    if (!this.productForm.valid) return;

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price.toString());
    formData.append('category', this.productForm.value.category);
    formData.append('sectionType', this.productForm.value.sectionType);

    // إضافة الأحجام
    this.productForm.value.sizes.forEach((size: string) => formData.append('sizes', size));

    // إضافة الصور الجديدة فقط
    this.previewImages.forEach(img => {
      if (img.file) formData.append('images', img.file);
    });

    // إضافة الصور القديمة (التي لم يتم حذفها)
    const existingImages = this.previewImages
      .filter(img => !img.file)
      .map(img => img.url);
    formData.append('existingImages', JSON.stringify(existingImages));

    this.productService.updateProduct(this.productId, formData).subscribe({
      next: () => this.router.navigate(['/product']),
      error: err => console.error('Update error:', err)
    });
  }
}
