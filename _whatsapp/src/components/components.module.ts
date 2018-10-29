import { NgModule } from '@angular/core';
import { FirenasePhoneNumberCheckComponent } from './firenase-phone-number-check/firenase-phone-number-check';
import { SelectCountriesCodeComponent } from './select-countries-code/select-countries-code';
@NgModule({
	declarations: [FirenasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent],
	imports: [],
	exports: [FirenasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent]
})
export class ComponentsModule {}
